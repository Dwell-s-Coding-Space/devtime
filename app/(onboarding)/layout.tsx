import Image from 'next/image';

export default function OnboardingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-1">
      <div className="bg-background-primary flex flex-1 items-center justify-center">
        <div className="flex flex-col gap-9">
          <Image
            src={'/logo-vertical-white.svg'}
            alt="logo"
            width={264}
            height={200}
            unoptimized
            className="fill-background-white"
          />
          <span className="title-s text-text-white text-center">개발자를 위한 타이머</span>
        </div>
      </div>
      <div
        className="flex flex-1 justify-center overflow-y-scroll"
        style={{
          paddingTop: 'calc(140 / 1080 * 100vh)',
          paddingBottom: 'calc(150 / 1080 * 100vh)',
        }}
      >
        {children}
      </div>
    </div>
  );
}
