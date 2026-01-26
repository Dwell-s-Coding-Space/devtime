import TimerStart from '@/src/shared/assets/svg/timer-start.svg';
import TimerPause from '@/src/shared/assets/svg/timer-pause.svg';

const TimerStop = () => {
  return <div className="h-25 w-25 rounded-[8px] bg-current" />;
};

export default async function Home() {
  return (
    <div className="mx-auto max-w-[1032px]">
      <div className="my-[96px] flex flex-col items-center gap-[50px]">
        <div className="text-text-secondary flex flex-col gap-2.5 text-center">
          <h1 className="text-[72px] leading-[86px] font-bold">WELCOME</h1>
          <span className="label-r">DevTime을 사용하려면 로그인이 필요합니다.</span>
        </div>

        <div className="flex flex-col gap-20">
          <div className="flex gap-12">
            <div className="text-text-primary border-primary flex h-[298px] w-[264px] flex-col gap-9 rounded-[12px] border bg-[linear-gradient(135deg,rgba(76,121,255,0)_0%,rgba(76,121,255,0.2)_100%)] p-2 pb-9 text-center">
              <span className="timer">00</span>
              <span className="label-s">HOURS</span>
            </div>

            <div className="flex flex-col justify-center gap-16">
              <div className="bg-background-primary h-6 w-6 rounded-full" />
              <div className="bg-background-primary h-6 w-6 rounded-full" />
            </div>

            <div className="text-text-primary border-primary flex h-[298px] w-[264px] flex-col gap-9 rounded-[12px] border bg-[linear-gradient(135deg,rgba(76,121,255,0)_0%,rgba(76,121,255,0.2)_100%)] p-2 pb-9 text-center">
              <span className="timer">00</span>
              <span className="label-s">MINUTES</span>
            </div>

            <div className="flex flex-col justify-center gap-16">
              <div className="bg-background-primary h-6 w-6 rounded-full" />
              <div className="bg-background-primary h-6 w-6 rounded-full" />
            </div>

            <div className="text-text-primary border-primary flex h-[298px] w-[264px] flex-col gap-9 rounded-[12px] border bg-[linear-gradient(135deg,rgba(76,121,255,0)_0%,rgba(76,121,255,0.2)_100%)] p-2 pb-9 text-center">
              <span className="timer">00</span>
              <span className="label-s">SECONDS</span>
            </div>
          </div>

          <div className="flex justify-center gap-20">
            <button
              disabled
              className="disabled:text-background-primary-light text-content-primary"
            >
              <TimerStart />
            </button>
            <button
              disabled
              className="disabled:text-background-primary-light text-content-primary"
            >
              <TimerPause />
            </button>
            <button
              disabled
              className="disabled:text-background-primary-light text-content-primary"
            >
              <TimerStop />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
