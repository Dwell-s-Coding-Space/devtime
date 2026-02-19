import { cookies } from 'next/headers';
import Link from 'next/link';

import UserDropdown from '@/src/features/auth/components/UserDropdown';

import { LogoHorizontal } from '../../assets/svg';
import { ROUTES } from '../../constants/routes';

const Navbar = async () => {
  const accessToken = (await cookies()).get('accessToken')?.value;
  const isLoggedIn = accessToken ? true : false;

  return (
    <div className="mb-10 flex items-center justify-between">
      <div className="flex items-center gap-12">
        <Link href={ROUTES.HOME} aria-label="홈으로 이동">
          <LogoHorizontal />
        </Link>
        <ul className="flex items-center gap-9">
          <li>
            <Link href={ROUTES.DASHBOARD} className="text-text-secondary body-s">
              대시보드
            </Link>
          </li>
          <li>
            <Link href={ROUTES.RANKING} className="text-text-secondary body-s">
              랭킹
            </Link>
          </li>
        </ul>
      </div>

      {isLoggedIn ? (
        <UserDropdown />
      ) : (
        <ul className="flex items-center gap-12">
          <li>
            <Link href={ROUTES.LOGIN} className="text-text-secondary body-s shrink-0">
              로그인
            </Link>
          </li>
          <li>
            <Link href={ROUTES.SIGNUP} className="text-text-secondary body-s shrink-0">
              회원가입
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Navbar;
