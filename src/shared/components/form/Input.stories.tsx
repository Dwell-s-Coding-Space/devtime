import { Meta, StoryObj } from '@storybook/nextjs-vite';

import Input from './Input';
import Label from './Label';

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  args: {
    id: 'goal',
    placeholder: '공부 목표를 입력해 주세요.',
    hasError: false,
  },
  parameters: {
    docs: {
      description: {
        component:
          '텍스트 입력 필드 컴포넌트입니다. innerButton으로 내부 버튼을, hasError로 에러 상태를 표시할 수 있습니다.',
      },
    },
  },
  argTypes: {
    id: { description: 'input 요소의 id (Label htmlFor와 연결)' },
    placeholder: { description: '입력 필드의 placeholder 텍스트' },
    innerButton: { description: '입력 필드 내부에 표시되는 버튼' },
    hasError: { description: '에러 상태 표시 (outline 스타일 적용)' },
  },
  render: args => (
    <div className="flex flex-col gap-2">
      <Label htmlFor={args.id}>공부 목표</Label>
      <Input {...args} />
    </div>
  ),
} satisfies Meta<typeof Input>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithError: Story = {
  args: {
    hasError: true,
  },
};

export const WithButton: Story = {
  args: {
    id: 'add-task',
    placeholder: '할 일을 추가해 주세요.',
    innerButton: (
      <button
        onClick={() => {}}
        className="disabled:body-b disabled:text-text-placeholder body-b text-text-primary"
      >
        추가
      </button>
    ),
  },
  render: args => (
    <div className="flex flex-col gap-2">
      <Label htmlFor={args.id}>할 일 목록</Label>
      <Input {...args} />
    </div>
  ),
};
