import { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useArgs } from 'storybook/internal/preview-api';
import { fn } from 'storybook/test';

import { PURPOSE_OPTIONS } from '@/src/features/mypage/mypage.schema';

import Label from './Label';
import Select from './Select';

const meta = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '키보드 내비게이션과 ARIA combobox 패턴을 지원하는 커스텀 셀렉트. Label의 htmlFor와 id를 연결하여 접근성을 확보합니다.',
      },
    },
  },
  args: {
    onChange: fn(),
    options: PURPOSE_OPTIONS,
    placeholder: '공부의 목적을 선택해 주세요.',
    id: 'purpose-select',
  },
  render: args => {
    const [, updatedArgs] = useArgs();

    return (
      <div className="flex flex-col gap-2">
        <Label htmlFor="purpose-select">공부 목적</Label>
        <Select {...args} onChange={value => updatedArgs({ value })} />
      </div>
    );
  },
} satisfies Meta<typeof Select>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '옵션 선택 시 값이 반영됩니다. 키보드(Arrow Up/Down, Home, End, Enter, Escape)로도 조작 가능합니다.',
      },
    },
  },
};
