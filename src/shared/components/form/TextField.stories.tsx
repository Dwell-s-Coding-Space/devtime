import { Meta, StoryObj } from '@storybook/nextjs-vite';

import Button from '../button/Button';
import TextField from './TextField';

const meta = {
  title: 'Components/TextField',
  component: TextField,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Label, Input, 메시지를 조합한 폼 필드 컴포넌트입니다. messageType으로 유효성 검사 상태를 표시합니다.',
      },
    },
  },
  argTypes: {
    id: { description: 'input 요소의 id (Label htmlFor와 자동 연결)' },
    label: { description: '필드 상단에 표시되는 레이블 텍스트' },
    placeholder: { description: '입력 필드의 placeholder 텍스트' },
    message: { description: '필드 하단에 표시되는 에러/안내/성공 메시지' },
    messageType: { description: '메시지 유형 (error, informative, success)' },
    innerButton: { description: '입력 필드 내부에 표시되는 버튼' },
    outerButton: { description: '입력 필드 외부에 표시되는 버튼' },
  },
  args: {
    id: 'nickname',
    label: '닉네임',
    placeholder: '닉네임을 입력해 주세요.',
  },
} satisfies Meta<typeof TextField>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Success: Story = {
  args: {
    messageType: 'success',
    message: '사용 가능한 닉네임입니다.',
  },
};

export const Error: Story = {
  args: {
    messageType: 'error',
    message: '닉네임을 입력해 주세요.',
  },
};

export const Informative: Story = {
  args: {
    messageType: 'informative',
    message: '1자 이상 입력해주세요.',
  },
};

export const WithInnerButton: Story = {
  args: {
    id: 'add-task',
    label: '할 일 목록',
    placeholder: '할 일을 추가해 주세요.',
    innerButton: (
      <button onClick={() => {}} className="body-b text-text-primary">
        추가
      </button>
    ),
  },
};

export const WithOuterButton: Story = {
  args: {
    id: 'id',
    label: '아이디',
    placeholder: '이메일 주소 형식으로 입력해 주세요.',
    outerButton: (
      <Button className="h-11" onClick={() => {}}>
        중복 확인
      </Button>
    ),
  },
};
