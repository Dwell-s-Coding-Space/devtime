'use client';

import { useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/src/shared/utils/cn';
import ChevronDoubleLeftIcon from '@/src/shared/assets/svg/chevron-double-left.svg';
import ChevronDoubleRightIcon from '@/src/shared/assets/svg/chevron-double-right.svg';
import ChevronRightIcon from '@/src/shared/assets/svg/chevron-right.svg';
import ChevronLeftIcon from '@/src/shared/assets/svg/chevron-left.svg';

interface PaginationProps {
  totalPage: number;
}

const Pagination = ({ totalPage }: PaginationProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const getDisplayedButtons = () => {
    if (totalPage <= 10)
      return Array(totalPage)
        .fill(0)
        .map((_, idx) => String(idx + 1));

    if (currentPage <= 8) {
      const result: string[] = [];
      Array(8)
        .fill(0)
        .map((_, idx) => result.push(String(idx + 1)));

      result.push('...');
      result.push(String(totalPage));
      return result;
    }

    if (totalPage - 8 < currentPage) {
      const result: string[] = [];
      result.push('1');
      result.push('...');

      Array(8)
        .fill(0)
        .map((_, idx) => result.push(String(totalPage - 8 + idx + 1)));

      return result;
    }

    const result: string[] = [];
    result.push('1');
    result.push('...');

    for (let i = currentPage - 2; i < currentPage + 4; i++) {
      result.push(String(i));
    }

    result.push('...');
    result.push(String(totalPage));

    return result;
  };

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const movePage = (pageNumber: number) => {
    const url = pathname + '?' + createQueryString('page', String(pageNumber));
    router.push(url);
  };

  return (
    <div className="flex items-center justify-center gap-3">
      <button
        onClick={() => movePage(1)}
        disabled={currentPage === 1}
        className="bg-background-primary-light text-content-primary disabled:bg-background-disabled disabled:text-text-disabled-300 h-6 w-6 rounded-[5px]"
      >
        <ChevronDoubleLeftIcon className="h-6 w-6" />
      </button>
      <button
        onClick={() => movePage(currentPage - 1)}
        disabled={currentPage === 1}
        className="bg-background-primary-light text-content-primary disabled:bg-background-disabled disabled:text-text-disabled-300 h-6 w-6 rounded-[5px]"
      >
        <ChevronLeftIcon className="h-6 w-6" />
      </button>
      {getDisplayedButtons().map(page => (
        <button
          key={page}
          onClick={() => movePage(Number(page))}
          className={cn(
            'h-6 w-fit min-w-6 rounded-[5px]',
            currentPage === Number(page)
              ? 'body-b text-text-white bg-content-primary'
              : 'body-m text-text-g600 bg-background-gray-dark'
          )}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => movePage(currentPage + 1)}
        disabled={currentPage === totalPage}
        className="bg-background-primary-light text-content-primary disabled:bg-background-disabled disabled:text-text-disabled-300 h-6 w-6 rounded-[5px]"
      >
        <ChevronRightIcon className="h-6 w-6" />
      </button>
      <button
        onClick={() => movePage(totalPage)}
        disabled={currentPage === totalPage}
        className="bg-background-primary-light text-content-primary disabled:bg-background-disabled disabled:text-text-disabled-300 h-6 w-6 rounded-[5px]"
      >
        <ChevronDoubleRightIcon className="h-6 w-6" />
      </button>
    </div>
  );
};

export default Pagination;
