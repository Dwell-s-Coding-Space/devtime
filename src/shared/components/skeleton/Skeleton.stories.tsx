import { Meta, StoryObj } from '@storybook/nextjs-vite';

import Skeleton from './Skeleton';
import SkeletonList from './SkeletonList';

const meta = {
  title: 'Components/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '콘텐츠 로딩 중 표시되는 플레이스홀더 애니메이션. className으로 크기와 모양을 조절합니다.',
      },
    },
  },
  argTypes: {
    className: {
      description: 'Tailwind 클래스로 너비/높이/모양 지정 (예: `h-4 w-full rounded-full`)',
      control: 'text',
    },
  },
  args: {
    className: 'h-[50px]',
  },
  globals: {
    backgrounds: { value: 'dark', grid: false },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;
type ListStory = StoryObj<{ className?: string; count: number }>;

export const Default: Story = {
  parameters: {
    docs: {
      description: { story: '기본 Skeleton. 높이와 너비를 className으로 조절합니다.' },
    },
  },
};

export const List: ListStory = {
  parameters: {
    docs: {
      description: { story: '여러 개의 Skeleton을 반복 렌더링. count로 개수를 조절합니다.' },
    },
  },
  argTypes: {
    count: { control: { type: 'number', min: 1, max: 20 } },
  },
  args: {
    className: 'h-[50px]',
    count: 5,
  },
  render: ({ className, count }) => (
    <div className="flex flex-col gap-5">
      <SkeletonList count={count} className={className} />
    </div>
  ),
};

export const OnLight: Story = {
  parameters: {
    docs: {
      description: { story: '밝은 배경에서의 Skeleton. 배경색을 변경하여 시인성을 확보합니다.' },
    },
  },
  globals: { backgrounds: { value: 'light' } },
  args: {
    className: 'h-[50px] bg-gray-300',
  },
};
