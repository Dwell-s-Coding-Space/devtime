const { LHCI_EMAIL, LHCI_NICKNAME, LHCI_PASSWORD } = process.env;

const PUBLIC_ROUTES = ['/home', '/login', '/signup'];

/**
 * @param {import('puppeteer').Browser} browser
 * @param {{url: string}} context
 */

module.exports = async (browser, context) => {
  const page = await browser.newPage();
  const url = new URL(context.url);

  console.log(`🟡 Target: ${url.pathname}`);

  // Public/Guest-only route는 로그인 없이 바로 수집
  if (PUBLIC_ROUTES.includes(url.pathname)) {
    console.log(`🟡 Public route - skipping auth`);
    await page.goto(context.url, { waitUntil: 'networkidle0' });
    await page.close();
    return;
  }

  // 1. 로그인 페이지로 이동
  console.log(`🟡 Navigating to /login`);
  await page.goto('http://localhost:3000/login', { waitUntil: 'networkidle0' });

  // 이미 로그인된 상태면 /login이 /home으로 리다이렉트됨 (GUEST_ONLY_ROUTE)
  const currentPath = new URL(page.url()).pathname;
  if (currentPath !== '/login') {
    console.log(`🟡 Already logged in! Navigating back to ${context.url} - skipping auth`);
    await page.goto(context.url, { waitUntil: 'networkidle0' });
    await page.close();
    return;
  }

  // 2. 회원가입 시도 (중복이면 무시, 페이지 이동 X, API 호출만)
  console.log(`🟡 Attempting signup...`);
  const signupResult = await page.evaluate(
    async ({ email, nickname, password }) => {
      try {
        const res = await fetch('/api/proxy/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            nickname,
            password,
            confirmPassword: password,
          }),
        });
        const body = await res.text();
        return { status: res.status, ok: res.ok, body };
      } catch (e) {
        return { error: e.message };
      }
    },
    { email: LHCI_EMAIL, nickname: LHCI_NICKNAME, password: LHCI_PASSWORD }
  );
  console.log(`🟡 Signup response: ${JSON.stringify(signupResult)}`);

  // 3. 로그인 : Puppeteer UI 조작으로 쿠키 설정
  console.log(`🟡 Filling login form...`);
  await page.waitForSelector('input[name="email"]');
  await page.type('input[name="email"]', LHCI_EMAIL);
  await page.type('input[name="password"]', LHCI_PASSWORD);
  await page.click('button[type="submit"]');
  console.log(`🟡 Login submitted, waiting for modal...`);

  // 로그인 성공/실패 모달의 "확인" 버튼 대기 후 클릭
  // 성공시 home으로 이동
  await page.waitForSelector('button[type="button"]', { visible: true, timeout: 3000 });
  await page.click('button[type="button"]');
  await page.waitForNavigation({ waitUntil: 'networkidle0' }).catch(() => {
    throw new Error('🟡 Login failed - check LHCI_EMAIL/LHCI_PASSWORD');
  });
  console.log(`🟡 Login Success! Navigated to: ${page.url()}`);

  // 4. Lighthouse 수집 URL로 이동
  console.log(`🟡 Navigating to target: ${context.url}`);
  await page.goto(context.url, { waitUntil: 'networkidle0' });
  await page.close();
};
