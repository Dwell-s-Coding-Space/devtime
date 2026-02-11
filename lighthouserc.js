module.exports = {
  ci: {
    collect: {
      startServerCommand: 'pnpm start',
      startServerReadyPattern: 'Ready in',
      url: [
        'http://localhost:3000/home',
        'http://localhost:3000/login',
        'http://localhost:3000/signup',
        'http://localhost:3000/dashboard',
        'http://localhost:3000/ranking',
        'http://localhost:3000/mypage',
        'http://localhost:3000/mypage/edit',
      ],
      numberOfRuns: 3,
      puppeteerScript: './scripts/lighthouse-auth.js',
      puppeteerLaunchOptions: {
        args: ['--no-sandbox'],
      },
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.8 }],
        'categories:accessibility': ['warn', { minScore: 0.9 }],
        'categories:best-practices': ['warn', { minScore: 0.8 }],
        'categories:seo': ['warn', { minScore: 0.8 }],
      },
    },
    upload: {
      target: 'lhci',
      serverBaseUrl: 'http://3.107.194.233:9001',
      token: process.env.LHCI_TOKEN,
    },
  },
};
