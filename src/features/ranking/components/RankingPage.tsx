'use client';

import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

import SkeletonList from '@/src/shared/components/skeleton/SkeletonList';
import { cn } from '@/src/shared/utils/cn';

import { RankingOption } from '../ranking.api';
import { rankingQueries } from '../ranking.queries';
import RankingItem from './RankingItem';

export const RANKING_OPTION_MAP: Record<string, RankingOption> = {
  '총 학습 시간': 'total',
  '일 평균 학습 시간': 'avg',
};

const RankingPage = () => {
  const observerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const rankingOption = (searchParams.get('option') ||
    RANKING_OPTION_MAP['총 학습 시간']) as (typeof RANKING_OPTION_MAP)[string];

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useSuspenseInfiniteQuery(
    rankingQueries.list({ sortBy: rankingOption, limit: 5 })
  );
  const rankingList = data.pages.flatMap(page => page.data.rankings);

  useEffect(() => {
    const el = observerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [fetchNextPage, isFetchingNextPage, hasNextPage]);

  return (
    <div className="flex flex-col gap-3">
      {/* ranking option menu */}
      <div className="bg-background-white flex w-fit items-center gap-3 rounded-[12px] p-2">
        {Object.entries(RANKING_OPTION_MAP).map(([label, value]) => {
          const isSelected = value === rankingOption;

          return (
            <Link
              key={value}
              href={`${pathname}?option=${value}`}
              className={cn(
                'inline-flex rounded-[8px] p-2',
                isSelected
                  ? 'bg-background-primary-light subtitle-b text-text-secondary'
                  : 'subtitle-r text-text-secondary bg-transparent'
              )}
            >
              {label}
            </Link>
          );
        })}
      </div>

      {/* ranking list */}
      <div className="flex flex-col gap-3">
        {rankingList.map(ranking => (
          <RankingItem data={ranking} key={ranking.userId} />
        ))}

        <div className="h-[10px] w-full" ref={observerRef} />
        {isFetchingNextPage && <SkeletonList count={3} className="h-[150px] bg-gray-300" />}
      </div>
    </div>
  );
};

export default RankingPage;
