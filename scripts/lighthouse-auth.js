const { LHCI_EMAIL, LHCI_NICKNAME, LHCI_PASSWORD } = process.env;

const PUBLIC_ROUTES = ['/home', '/login', '/signup'];

/**
 * @param {import('puppeteer').Browser} browser
 * @param {{url: string}} context
 */

module.exports = async (browser, context) => {
  const page = await browser.newPage();
  const url = new URL(context.url);

  // Public/Guest-only route는 로그인 없이 바로 수집
  if (PUBLIC_ROUTES.includes(url.pathname)) {
    await page.goto(context.url, { waitUntil: 'networkidle0' });
    await page.close();
    return;
  }

  // 1. 회원가입 시도 (중복이면 무시)
  await page.goto('http://localhost:3000/login');
  await page.evaluate(
    async ({ email, nickname, password }) => {
      await fetch('/api/proxy/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          nickname,
          password,
          confirmPassword: password,
        }),
      });
    },
    { email: LHCI_EMAIL, nickname: LHCI_NICKNAME, password: LHCI_PASSWORD }
  );

  // 2. 로그인 (Puppeteer UI 조작으로 쿠키 설정)
  await page.waitForSelector('input[name="email"]');
  await page.type('input[name="email"]', LHCI_EMAIL);
  await page.type('input[name="password"]', LHCI_PASSWORD);
  await page.click('button[type="submit"]');

  // 로그인 성공/실패 모달의 "확인" 버튼 대기 후 클릭
  await page.waitForSelector('button[type="button"]', { visible: true });
  await page.click('button[type="button"]');
  await page.waitForNavigation({ waitUntil: 'networkidle0' });

  // 3. Lighthouse 수집 URL로 이동
  await page.goto(context.url, { waitUntil: 'networkidle0' });
  await page.close();
};
