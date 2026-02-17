import { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';

import ErrorBoundaryFallback from './ErrorBoundaryFallback';

const meta = {
  title: 'Components/ErrorBoundaryFallback',
  component: ErrorBoundaryFallback,
  tags: ['autodocs'],
  args: {
    onRetry: fn(),
  },
} satisfies Meta<typeof ErrorBoundaryFallback>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const FullHeight: Story = {
  parameters: {
    docs: {
      description: { story: '전체 높이를 채우는 레이아웃에서의 모습' },
    },
  },
  args: {
    className: 'h-screen',
  },
};
