import { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';

import Button from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    a11y: {
      config: {
        rules: [
          { id: 'button-name', enabled: true },
          { id: 'color-contrast', enabled: true },
        ],
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
  },
  args: {
    onClick: fn(),
    disabled: false,
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  parameters: {
    docs: {
      description: { story: '기본 버튼 스타일. CTA 등 주요 액션에 사용' },
    },
  },
  args: {
    variant: 'primary',
    children: 'Button',
  },
};

export const PrimaryDisabled: Story = {
  parameters: {
    docs: {
      description: { story: 'variant=Primary의 비활성화 상태.' },
    },
  },
  args: {
    ...Primary.args,
    disabled: true,
  },
};

export const Secondary: Story = {
  parameters: {
    docs: {
      description: { story: '보조 액션에 사용하는 버튼' },
    },
  },
  args: {
    variant: 'secondary',
    children: 'Button',
  },
};

export const SecondaryDisabled: Story = {
  parameters: {
    docs: {
      description: { story: 'variant=Secondary 비활성화 상태.' },
    },
  },
  args: {
    ...Secondary.args,
    disabled: true,
  },
};

export const Tertiary: Story = {
  parameters: {
    docs: {
      description: { story: '덜 강조되는 액션에 사용하는 버튼' },
    },
  },
  args: {
    variant: 'tertiary',
    children: 'Button',
  },
};

export const TertiaryDisabled: Story = {
  parameters: {
    docs: {
      description: { story: 'variant=Tertiary 비활성화 상태.' },
    },
  },
  args: {
    ...Tertiary.args,
    disabled: true,
  },
};
