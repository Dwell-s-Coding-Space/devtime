import { Meta, StoryObj } from '@storybook/nextjs-vite';

import Label from './Label';
import Textarea from './Textarea';

const meta = {
  title: 'Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '여러 줄 텍스트 입력을 위한 Textarea 컴포넌트입니다.',
      },
    },
  },
  argTypes: {
    id: { description: 'textarea 요소의 id (Label htmlFor와 연결)' },
    placeholder: { description: '입력 필드의 placeholder 텍스트' },
  },
  args: {
    id: 'study-reflection',
    placeholder: '오늘 학습한 내용을 회고해 보세요(15자 이상 작성 필수).',
  },
  render: args => (
    <div className="flex flex-col gap-2">
      <Label htmlFor={args.id}>학습 회고</Label>
      <Textarea {...args} />
    </div>
  ),
} satisfies Meta<typeof Textarea>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: 'h-[150px]',
  },
};
