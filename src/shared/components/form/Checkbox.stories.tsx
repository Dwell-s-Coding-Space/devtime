import { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ComponentProps } from 'react';
import { useArgs } from 'storybook/internal/preview-api';

import Checkbox from './Checkbox';
import Label from './Label';

type CheckboxStoryArgs = ComponentProps<typeof Checkbox> & { label: string };

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '커스텀 스타일의 체크박스 컴포넌트입니다. regular과 todo 두 가지 variant를 지원합니다.',
      },
    },
  },
  argTypes: {
    id: { description: 'input 요소의 id (Label htmlFor와 연결)' },
    variant: { description: '체크박스 스타일 (regular, todo)' },
    checked: { description: '체크 상태' },
    label: { description: '체크박스 옆에 표시되는 레이블 텍스트' },
  },
  args: {
    id: 'checkbox',
    className: 'h-6 w-6',
    label: '체크박스',
  },
} satisfies Meta<CheckboxStoryArgs>;
export default meta;
type Story = StoryObj<Meta<CheckboxStoryArgs>>;

export const Regular: Story = {
  args: {
    variant: 'regular',
    checked: false,
  },
  render: args => {
    const [_, updateArgs] = useArgs();
    const { label, ...checkboxArgs } = args;
    return (
      <Label htmlFor={checkboxArgs.id} className="flex items-center gap-2">
        {label}
        <Checkbox
          {...checkboxArgs}
          onChange={() => updateArgs({ checked: !checkboxArgs.checked })}
        />
      </Label>
    );
  },
};

export const Todo: Story = {
  globals: { backgrounds: { value: 'dark' } },
  args: {
    variant: 'todo',
    checked: false,
  },
  render: args => {
    const [_, updateArgs] = useArgs();
    const { label, ...checkboxArgs } = args;
    return (
      <Label htmlFor={checkboxArgs.id} className="text-text-white flex items-center gap-2">
        {label}
        <Checkbox
          {...checkboxArgs}
          onChange={() => updateArgs({ checked: !checkboxArgs.checked })}
        />
      </Label>
    );
  },
};
