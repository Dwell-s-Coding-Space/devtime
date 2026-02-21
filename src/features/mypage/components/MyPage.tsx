'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';

import { EditIcon, UserIcon } from '@/src/shared/assets/svg';
import { ROUTES } from '@/src/shared/constants/routes';
import { cn } from '@/src/shared/utils/cn';
import { getS3ImageUrl } from '@/src/shared/utils/url';

import { mypageQueries } from '../mypage.queries';

const MyPage = () => {
  const { data: profileData } = useSuspenseQuery(mypageQueries.profile());

  const { nickname, email, profile } = profileData;
  const { profileImage, purpose, techStacks, career, goal } = profile || {};
  const purposeString = typeof purpose === 'object' ? purpose.detail : purpose;

  return (
    <div className="bg-border-white flex gap-[56px] rounded-[12px] p-9">
      <div className="flex flex-1 flex-col gap-[56px] sm:flex-row">
        <div className="relative h-[180px] w-[180px] overflow-hidden rounded-[8px]">
          {profileImage ? (
            <Image
              src={getS3ImageUrl(profileImage)}
              alt="profile"
              fill
              sizes="180px"
              preload
              className="object-cover"
            />
          ) : (
            <div
              role="img"
              aria-label="프로필 기본"
              className="bg-background-gray-dark text-state-disabled flex h-full w-full items-center justify-center"
            >
              <UserIcon className="h-12 w-12" />
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-12">
          <div className="flex flex-col gap-1">
            <span className="label-s text-text-secondary">{nickname}</span>
            <p className={cn('heading-b', goal ? 'text-text-secondary' : 'text-text-placeholder')}>
              {goal || '아직 설정한 목표가 없어요.'}
            </p>
          </div>

          <dl className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <dt className="label-s text-text-g600">이메일 주소</dt>
              <dd className={cn('subtitle-s', email ? 'text-text-g800' : 'text-text-placeholder')}>
                {email}
              </dd>
            </div>

            <div className="flex flex-col gap-1">
              <dt className="label-s text-text-g600">개발 경력</dt>
              <dd className={cn('subtitle-s', career ? 'text-text-g800' : 'text-text-placeholder')}>
                {career || '개발 경력을 업데이트 해주세요.'}
              </dd>
            </div>

            <div className="flex flex-col gap-1">
              <dt className="label-s text-text-g600">공부 목적</dt>
              <dd
                className={cn('subtitle-s', purpose ? 'text-text-g800' : 'text-text-placeholder')}
              >
                {purposeString || '공부 목적을 업데이트 해주세요.'}
              </dd>
            </div>

            <div className="flex flex-col gap-1">
              <dt className="label-s text-text-g600">개발 스택</dt>
              <dd
                className={cn(
                  'subtitle-s',
                  techStacks ? 'text-text-g800 body-m' : 'text-text-placeholder subtitle-s'
                )}
              >
                {techStacks ? (
                  <div className="flex flex-wrap gap-2">
                    {techStacks.map(stack => (
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

        <Link href={ROUTES.MYPAGE_EDIT} className="text-text-g800 flex h-fit items-center gap-2">
          <EditIcon className="h-6 w-6" />
          <span className="label-m">회원정보 수정</span>
        </Link>
      </div>
    </div>
  );
};

export default MyPage;
