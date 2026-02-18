import { Meta, StoryObj } from '@storybook/nextjs-vite';

import StatBox from './StatBox';

const MOCK_STAT_DATA = {
  consecutiveDays: 432,
  totalStudyTime: 176160,
  averageDailyStudyTime: 10300,
  taskCompletionRate: 98.7,
};

const meta = {
  title: 'Features/StatBox',
  component: StatBox,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '대시보드에서 통계 수치를 표시하는 박스 컴포넌트입니다.',
      },
    },
  },
  argTypes: {
    label: { description: '통계 항목 레이블' },
    value: { description: '통계 수치 값' },
    type: { description: '표시 유형 (time, day, rate)' },
  },
  args: {
    label: '시간',
    type: 'time',
    value: MOCK_STAT_DATA['averageDailyStudyTime'],
  },
} satisfies Meta<typeof StatBox>;
export default meta;
type Story = StoryObj<typeof meta>;

export const TimeStatBox: Story = {
  args: {
    label: '누적 공부 시간',
    type: 'time',
    value: MOCK_STAT_DATA['totalStudyTime'],
  },
};

export const DayStatBox: Story = {
  args: {
    label: '누적 공부 일수',
    type: 'day',
    value: MOCK_STAT_DATA['consecutiveDays'],
  },
};

export const RateStatBox: Story = {
  args: {
    label: '목표 달성률',
    type: 'rate',
    value: MOCK_STAT_DATA['taskCompletionRate'],
  },
};

export const StatSummary: Story = {
  render: () => (
    <div className="grid h-fit w-fit grid-cols-2 grid-rows-2 gap-4">
      <StatBox value={MOCK_STAT_DATA.totalStudyTime} label="누적 공부 시간" type="time" />
      <StatBox value={MOCK_STAT_DATA.consecutiveDays} label="누적 공부 일수" type="day" />
      <StatBox
        value={MOCK_STAT_DATA.averageDailyStudyTime}
        label="하루 평균 공부 시간"
        type="time"
      />
      <StatBox value={MOCK_STAT_DATA.taskCompletionRate} label="목표 달성률" type="rate" />
    </div>
  ),
};
