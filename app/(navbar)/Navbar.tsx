import Link from "next/link";
import Image from "next/image";

const IS_LOGGED_IN = false

const Navbar = () => {
  const isLoggedIn = IS_LOGGED_IN;


  return (
    <div className="flex items-center justify-between mb-10">
      <div className="flex items-center gap-12">
        <Image src="./logo-horizontal.svg" alt="logo" width={148} height={40} unoptimized />
        <div className="flex items-center gap-9">
          <Link href={'/dashboard'}>
            <span className="text-text-secondary body-s">대시보드</span>
          </Link>
          <Link href={'/ranking'}>
            <span className="text-text-secondary body-s">랭킹</span>
          </Link>
        </div>
      </div>

      {isLoggedIn ? (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-background-primary-dark" />
          <span className="body-b text-text-secondary">DevTime</span>
        </div>
      ) : (
        <div className="flex items-center gap-12">
          <Link href={'/login'}>
            <span className="text-text-secondary body-s">로그인</span>
          </Link>
          <Link href={'/signup'}>
            <span className="text-text-secondary body-s">회원가입</span>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;