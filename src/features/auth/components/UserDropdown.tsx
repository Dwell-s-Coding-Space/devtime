'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { LogoutIcon, UserIcon } from '@/src/shared/assets/svg';
import { ROUTES } from '@/src/shared/constants/routes';
import { getS3ImageUrl } from '@/src/shared/utils/url';

import { mypageQueries } from '../../mypage/mypage.queries';
import { authQueries } from '../auth.queries';

const UserDropdown = () => {
  const router = useRouter();

  const { data } = useQuery({
    ...mypageQueries.profile(),
  });

  const { mutate } = useMutation({
    ...authQueries.logout(),
    onSuccess: data => {
      if (data.success) {
        alert(data.message);
        router.push(ROUTES.LOGIN);
      } else {
        alert(data.message);
      }
    },
  });

  const handleLogout = async () => {
    mutate();
  };

  return (
    <div className="group relative flex w-fit cursor-pointer items-center gap-3">
      <div className="relative h-10 w-10 overflow-hidden rounded-full">
        {data?.profile?.profileImage ? (
          <Image
            src={getS3ImageUrl(data.profile.profileImage)}
            alt="profile"
            className="object-cover"
            fill
            sizes="40px"
          />
        ) : (
          <div className="bg-background-primary-dark h-full w-full" />
        )}
      </div>
      <span className="body-b text-text-secondary">{data?.nickname}</span>

      <div className="text-text-g600 absolute top-full left-0 z-20 hidden group-hover:block">
        <div className="border-border-gray bg-background-white mt-[10px] flex flex-col gap-4 rounded-[5px] border px-3 py-4 whitespace-nowrap">
          <Link href={ROUTES.MYPAGE} className="flex items-center gap-4">
            <UserIcon className="h-5 w-5" />
            <span className="body-m">마이페이지</span>
          </Link>

          <div className="bg-border-gray h-[1px] w-full" />

          <button onClick={handleLogout} className="flex items-center gap-4">
            <LogoutIcon className="h-5 w-5" />
            <span className="body-m">로그아웃</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDropdown;
