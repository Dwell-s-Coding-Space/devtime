import Navbar from "@/app/(navbar)/Navbar";

export default function LayoutWithNavbar({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-[linear-gradient(180deg,#F6F7F9_0%,#E9ECF5_100%)]">
      <div className="max-w-[1200px] w-full m-auto pt-4 pb-12">
        <Navbar />
        {children}
      </div>
    </div>
  );
}

