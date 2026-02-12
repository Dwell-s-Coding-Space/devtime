import Image from 'next/image';

import { LoginForm } from '@/src/features/auth';

export default async function Login() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-x-hidden">
      <Image
        src="/symbol-logo.svg"
        alt="symbol"
        width={1090}
        height={530}
        unoptimized
        className="absolute h-auto"
        style={{
          width: `clamp(300px, calc(1090 / 1920 * 100vw), 1090px)`,
          top: 'calc(60 / 1080 * 100vh)',
          right: `calc(-218 / 1920 * 100vw)`,
        }}
      />
      <div className="flex h-[598px] w-[500px] flex-col items-center gap-12 rounded-[10px] bg-white/50 pt-18 shadow-[0_40px_100px_40px_rgba(3,104,255,0.05)] backdrop-blur-[25px]">
        <Image src="/logo-vertical-primary.svg" alt="logo" width={132} height={100} unoptimized />
        <LoginForm />
      </div>
    </div>
  );
}
