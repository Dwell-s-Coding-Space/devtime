import Image from "next/image";
import Button from "@/src/shared/components/button/Button";
import TextField from "@/src/shared/components/text-field/TextField";

export default async function Login() {

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-x-hidden">
      <Image src="/symbol-logo.svg" alt="symbol" width={1090} height={530} unoptimized className="absolute h-auto" style={{ width: `clamp(300px, calc(1090 / 1920 * 100vw), 1090px)`, top: 'calc(60 / 1080 * 100vh)', right: `calc(-218 / 1920 * 100vw)` }} />
      <div className="w-[500px] h-[598px] rounded-[10px] bg-white/50 backdrop-blur-[25px] shadow-[0_40px_100px_40px_rgba(3,104,255,0.05)] flex flex-col items-center pt-18 gap-12">
        <Image src="/logo-vertical.svg" alt="logo" width={132} height={100} unoptimized />
        <div className="w-[328px] flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <TextField label="아이디" placeholder="이메일 주소를 입력해 주세요." />
            <TextField label="비밀번호" placeholder="비밀번호를 입력해 주세요." />
          </div>
          <div className="flex flex-col gap-6 w-full">
            <Button variant="primary">로그인</Button>
            <button className="label-m text-text-primary">회원가입</button>
          </div>
        </div>
      </div>
    </div>
  );
}
