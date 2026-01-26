import Navbar from '@/app/(navbar)/Navbar';

export default function LayoutWithNavbar({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex-1 bg-[linear-gradient(180deg,#F6F7F9_0%,#E9ECF5_100%)]">
      <div className="m-auto w-full max-w-[1200px] pt-4 pb-12">
        <Navbar />
        {children}
      </div>
    </div>
  );
}
