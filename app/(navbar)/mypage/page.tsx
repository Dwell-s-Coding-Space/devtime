'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { cn } from '@/src/shared/utils/cn';
import { ROUTES } from '@/src/shared/constants/routes';
import { EditIcon, UserIcon } from '@/src/shared/assets/svg';
import { mypageQueries } from '@/src/features/mypage/mypage.queries';

export default function Mypage() {
  const { data: profileData } = useQuery(mypageQueries.profile());

  return (
    <div className="bg-border-white flex gap-[56px] rounded-[12px] p-9">
      {profileData?.profile?.profileImage ? (
        <Image src="" alt="" />
      ) : (
        <div className="bg-background-gray-dark text-state-disabled flex h-[180px] w-[180px] items-center justify-center rounded-[8px]">
          <UserIcon className="h-12 w-12" />
        </div>
      )}

      <div className="flex flex-1 flex-col gap-12">
        <div className="flex flex-col gap-1">
          <span className="label-s text-text-secondary">{profileData?.nickname}</span>
          <p
            className={cn(
              'heading-b',
              profileData?.profile?.goal ? 'text-text-secondary' : 'text-text-disabled-300'
            )}
          >
            {profileData?.profile?.goal || '아직 설정한 목표가 없어요.'}
          </p>
        </div>

        <dl className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <dt className="label-s text-text-disabled-400">이메일 주소</dt>
            <dd
              className={cn(
                'subtitle-s',
                profileData?.email ? 'text-text-g600' : 'text-text-disabled-300'
              )}
            >
              {profileData?.email}
            </dd>
          </div>

          <div className="flex flex-col gap-1">
            <dt className="label-s text-text-disabled-400">개발 경력</dt>
            <dd
              className={cn(
                'subtitle-s',
                profileData?.profile?.career ? 'text-text-g600' : 'text-text-disabled-300'
              )}
            >
              {profileData?.profile?.career || '개발 경력을 업데이트 해주세요.'}
            </dd>
          </div>

          <div className="flex flex-col gap-1">
            <dt className="label-s text-text-disabled-400">공부 목적</dt>
            <dd
              className={cn(
                'subtitle-s',
                profileData?.profile?.purpose ? 'text-text-g600' : 'text-text-disabled-300'
              )}
            >
              {profileData?.profile?.purpose || '공부 목적을 업데이트 해주세요.'}
            </dd>
          </div>

          <div className="flex flex-col gap-1">
            <dt className="label-s text-text-disabled-400">개발 스택</dt>
            <dd
              className={cn(
                'subtitle-s',
                profileData?.profile?.techStacks
                  ? 'text-text-g500 body-m'
                  : 'text-text-disabled-300 subtitle-s'
              )}
            >
              {profileData?.profile?.techStacks ? (
                <div className="flex flex-wrap gap-2">
                  {profileData?.profile.techStacks.map(stack => (
                    <span key={stack} className="bg-background-gray-dark rounded-[5px] px-2 py-1">
                      {stack}
                    </span>
                  ))}
                </div>
              ) : (
                '현재 공부 중인 또는 가지고 있는 개발 스택을 업데이트 해주세요.'
              )}
            </dd>
          </div>
        </dl>
      </div>

      <Link href={ROUTES.MYPAGE_EDIT} className="text-text-g600 flex h-fit items-center gap-2">
        <EditIcon className="h-6 w-6" />
        <span className="label-m">회원정보 수정</span>
      </Link>
    </div>
  );
}
