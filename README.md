# DevTime

공부 시간을 기록하고 분석하는 스터디 타이머 웹 애플리케이션입니다.

## 배포 링크
- [프론트 배포](https://main.d3qzxjbpaa4acq.amplifyapp.com/home)
- [스토리북](https://develop--698c73bc8fd26d868cc054fe.chromatic.com/)
- [lhci-server](http://3.107.194.233:9001/app/projects/devtime/dashboard)

## 주요 기능

- **타이머** — 공부 세션을 시작/일시정지/종료하고 태스크를 관리
- **대시보드** — 학습 통계, 히트맵, 공부 로그 확인
- **랭킹** — 다른 사용자와 공부 시간을 비교하는 리더보드
- **마이페이지** — 프로필 설정 및 계정 관리

## 기술 스택

| 영역           | 기술                              |
| -------------- | --------------------------------- |
| Framework      | Next.js 16 (App Router), React 19 |
| Language       | TypeScript 5                      |
| Styling        | Tailwind CSS 4                    |
| Data Fetching  | TanStack Query 5                  |
| Client State   | Zustand                           |
| Form           | React Hook Form + Zod             |
| Error Tracking | Sentry                            |
| Testing        | Vitest, Playwright, MSW           |
| Component Docs | Storybook                         |

## 프로젝트 구조

```
devtime/
├── app/                        # Next.js App Router
│   ├── (navbar)/               # 네비게이션 포함 레이아웃
│   │   ├── home/               # 타이머 페이지
│   │   ├── dashboard/          # 대시보드
│   │   ├── ranking/            # 랭킹
│   │   └── mypage/             # 마이페이지
│   ├── (onboarding)/           # 회원가입/프로필 설정
│   ├── login/                  # 로그인
│   └── api/proxy/              # 백엔드 API 프록시
│
└── src/
    ├── features/               # 기능 단위 모듈
    │   ├── auth/               # 인증
    │   ├── timer/              # 타이머
    │   ├── dashboard/          # 대시보드
    │   ├── ranking/            # 랭킹
    │   └── mypage/             # 마이페이지
    │
    └── shared/                 # 공통 모듈
        ├── api/                # API 클라이언트 (코어, 클라이언트, 서버)
        ├── components/         # 공통 UI 컴포넌트
        ├── providers/          # React 프로바이더
        ├── store/              # Zustand 스토어
        └── constants/          # 상수 (엔드포인트, 라우트 등)
```

## CI/CD

GitHub Actions를 통해 자동화된 워크플로우가 구성되어 있습니다.

- **Lint** — PR 시 ESLint 검사
- **Test** — 유닛 테스트 실행
- **E2E** — Playwright 크로스 브라우저 테스트 (Chromium, Firefox, WebKit)
- **Chromatic** — Storybook 시각적 회귀 테스트
- **Lighthouse CI** — 성능 측정
