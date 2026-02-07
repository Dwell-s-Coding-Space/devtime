import Link from 'next/link';
import Image from 'next/image';
import { cookies } from 'next/headers';
import Profile from './Profile';
import { ROUTES } from '../../constants/routes';

const Navbar = async () => {
  const accessToken = (await cookies()).get('accessToken')?.value;
  const isLoggedIn = accessToken ? true : false;

  return (
    <div className="mb-10 flex items-center justify-between">
      <div className="flex items-center gap-12">
        <Link href={ROUTES.HOME}>
          <Image src="./logo-horizontal.svg" alt="logo" width={148} height={40} unoptimized />
        </Link>
        <div className="flex items-center gap-9">
          <Link href={ROUTES.DASHBOARD}>
            <span className="text-text-secondary body-s">대시보드</span>
          </Link>
          <Link href={ROUTES.RANKING}>
            <span className="text-text-secondary body-s">랭킹</span>
          </Link>
        </div>
      </div>

      {isLoggedIn ? (
        <Profile />
      ) : (
        <div className="flex items-center gap-12">
          <Link href={ROUTES.LOGIN}>
            <span className="text-text-secondary body-s">로그인</span>
          </Link>
          <Link href={ROUTES.SIGNUP}>
            <span className="text-text-secondary body-s">회원가입</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
