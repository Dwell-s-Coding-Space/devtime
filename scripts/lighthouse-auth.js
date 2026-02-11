const { LHCI_EMAIL, LHCI_NICKNAME, LHCI_PASSWORD } = process.env;

const PUBLIC_ROUTES = ['/home', '/login', '/signup'];

/**
 * @param {import('puppeteer').Browser} browser
 * @param {{url: string}} context
 */

module.exports = async (browser, context) => {
  const page = await browser.newPage();
  const url = new URL(context.url);

  console.log(`[LHCI Auth] Target: ${url.pathname}`);

  // 브라우저 콘솔 로그 캡처
  page.on('console', (msg) => console.log(`[Browser] ${msg.text()}`));
  page.on('requestfailed', (req) =>
    console.log(`[Network Error] ${req.url()} - ${req.failure()?.errorText}`)
  );

  // Public/Guest-only route는 로그인 없이 바로 수집
  if (PUBLIC_ROUTES.includes(url.pathname)) {
    console.log(`[LHCI Auth] Public route - skipping auth`);
    await page.goto(context.url, { waitUntil: 'networkidle0' });
    await page.close();
    return;
  }

  // 1. 회원가입 시도 (중복이면 무시)
  console.log(`[LHCI Auth] Navigating to /login`);
  await page.goto('http://localhost:3000/login');

  console.log(`[LHCI Auth] Attempting signup...`);
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
  console.log(`[LHCI Auth] Signup response: ${JSON.stringify(signupResult)}`);

  // 2. 로그인 (Puppeteer UI 조작으로 쿠키 설정)
  console.log(`[LHCI Auth] Filling login form...`);
  await page.waitForSelector('input[name="email"]');
  await page.type('input[name="email"]', LHCI_EMAIL);
  await page.type('input[name="password"]', LHCI_PASSWORD);
  await page.click('button[type="submit"]');
  console.log(`[LHCI Auth] Login submitted, waiting for modal...`);

  // 로그인 성공/실패 모달의 "확인" 버튼 대기 후 클릭
  await page.waitForFunction(
    () => {
      const buttons = document.querySelectorAll('button[type="button"]');
      return [...buttons].find((btn) => btn.textContent?.trim() === '확인');
    },
    { timeout: 15000 }
  );
  console.log(`[LHCI Auth] Modal found, clicking confirm button...`);
  await page.evaluate(() => {
    const buttons = document.querySelectorAll('button[type="button"]');
    const confirmBtn = [...buttons].find(
      (btn) => btn.textContent?.trim() === '확인'
    );
    confirmBtn?.click();
  });
  await page.waitForNavigation({ waitUntil: 'networkidle0' });
  console.log(`[LHCI Auth] Navigated to: ${page.url()}`);

  // 3. Lighthouse 수집 URL로 이동
  console.log(`[LHCI Auth] Going to target: ${context.url}`);
  await page.goto(context.url, { waitUntil: 'networkidle0' });
  console.log(`[LHCI Auth] Ready for Lighthouse`);
  await page.close();
};
