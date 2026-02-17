import { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';

import { TrashIcon } from '../../assets/svg';
import IconButton from './IconButton';

const meta = {
  title: 'Components/IconButton',
  component: IconButton,
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
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    'aria-label': 'delete',
    className: 'text-primary',
    children: <TrashIcon className="h-8 w-8" />,
  },
};

export const Disabled: Story = {
  args: {
    'aria-label': 'delete',
    children: <TrashIcon className="h-8 w-8" />,
    disabled: true,
  },
};
