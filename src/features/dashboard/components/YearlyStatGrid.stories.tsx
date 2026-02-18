import { Meta, StoryObj } from '@storybook/nextjs-vite';
import { http, HttpResponse } from 'msw';
import { Suspense } from 'react';

import Skeleton from '@/src/shared/components/skeleton/Skeleton';

import YearlyStatGrid from './YearlyStatGrid';

const MOCK_HEATMAP_DATA = [
  {
    date: '2026-02-17',
    studyTimeHours: 9.566666666666666,
    colorLevel: 4,
  },
  {
    date: '2026-02-16',
    studyTimeHours: 4.633333333333334,
    colorLevel: 2,
  },
  {
    date: '2026-02-15',
    studyTimeHours: 6.85,
    colorLevel: 3,
  },
  {
    date: '2026-02-10',
    studyTimeHours: 14.533333333333333,
    colorLevel: 5,
  },
  {
    date: '2026-02-03',
    studyTimeHours: 7.033333333333333,
    colorLevel: 3,
  },
  {
    date: '2026-02-02',
    studyTimeHours: 5.366666666666666,
    colorLevel: 2,
  },
  {
    date: '2026-02-01',
    studyTimeHours: 9.066666666666666,
    colorLevel: 4,
  },
  {
    date: '2026-01-31',
    studyTimeHours: 9.033333333333333,
    colorLevel: 4,
  },
  {
    date: '2026-01-29',
    studyTimeHours: 8.983333333333333,
    colorLevel: 4,
  },
  {
    date: '2026-01-27',
    studyTimeHours: 6.583333333333333,
    colorLevel: 3,
  },
  {
    date: '2026-01-24',
    studyTimeHours: 5.133333333333334,
    colorLevel: 2,
  },
  {
    date: '2026-01-23',
    studyTimeHours: 7.55,
    colorLevel: 3,
  },
];

const meta = {
  title: 'Features/YearlyStatGrid',
  component: YearlyStatGrid,
  tags: ['autodocs'],
  globals: {
    backgrounds: { value: 'dark' },
  },
  decorators: [
    Story => (
      <Suspense fallback={<Skeleton className="h-[300px] bg-gray-300" />}>
        <Story />
      </Suspense>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: '연간 학습 시간을 히트맵으로 표시하는 컴포넌트입니다.',
      },
    },
    msw: {
      handlers: [
        http.get('/api/proxy/heatmap', () => {
          return HttpResponse.json({
            heatmap: MOCK_HEATMAP_DATA,
          });
        }),
      ],
    },
  },
} satisfies Meta<typeof YearlyStatGrid>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
