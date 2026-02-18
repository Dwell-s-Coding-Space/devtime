import { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useArgs } from 'storybook/internal/preview-api';
import { fn } from 'storybook/test';

import AutoComplete from './AutoComplete';
import Label from './Label';

const meta = {
  title: 'Components/AutoComplete',
  component: AutoComplete,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '검색 필터링과 새 항목 추가를 지원하는 AutoComplete 컴포넌트입니다. 키보드(Arrow Up/Down, Home, End, Enter, Escape)로 조작 가능합니다.',
      },
    },
  },
  argTypes: {
    id: { description: 'input 요소의 id (Label htmlFor와 연결)' },
    placeholder: { description: '입력 필드의 placeholder 텍스트' },
    options: { description: '자동완성 옵션 목록' },
    onSelect: { description: '옵션 선택 시 호출되는 콜백' },
    onAdd: { description: '새 항목 추가 시 호출되는 콜백 (미전달 시 추가 버튼 숨김)' },
  },
  args: {
    id: 'select-techStack',
    placeholder: '기술 스택을 검색해 등록해 주세요.',
    options: [
      'Next.js',
      'React',
      'TypeScript',
      'JavaScript',
      'HTML',
      'CSS',
      'Python',
      'Zod',
      'React Hook Form',
      'Zustand',
      'Tanstack Query',
    ],
    onSelect: fn(),
  },
  render: args => {
    const [, updateArgs] = useArgs();

    return (
      <div className="flex flex-col gap-2">
        <Label htmlFor="select-techStack">기술 스택</Label>
        <AutoComplete
          {...args}
          onSelect={value => args.onSelect(value)}
          onAdd={async value => {
            updateArgs({ options: [...args.options, value] });
            return {
              message: 'success',
              techStack: {
                id: 0,
                name: value,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              },
            };
          }}
        />
      </div>
    );
  },
} satisfies Meta<typeof AutoComplete>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
