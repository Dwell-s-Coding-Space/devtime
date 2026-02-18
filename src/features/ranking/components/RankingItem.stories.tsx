import { Meta, StoryObj } from '@storybook/nextjs-vite';

import RankingItem from './RankingItem';

const MOCK_RANKINGS_DATA: Parameters<typeof RankingItem>[0]['data'][] = [
  {
    rank: 1,
    userId: 'c23b223f-309d-497b-b2dd-1b130fb9e870',
    nickname: '김프론트',
    totalStudyTime: 9834900,
    averageStudyTime: 34267.94425087108,
    profile: {
      career: '0 - 3년',
      purpose: '단순 개발 역량 향상',
      profileImage: null,
      techStacks: [
        {
          id: 14469,
          name: 'HTML5',
        },
        {
          id: 14470,
          name: 'CSS3',
        },
        {
          id: 14471,
          name: 'JavaScript',
        },
        {
          id: 14472,
          name: 'TypeScript',
        },
        {
          id: 14473,
          name: 'React',
        },
        {
          id: 14474,
          name: 'Vue.js',
        },
        {
          id: 14476,
          name: 'Next.js',
        },
        {
          id: 14479,
          name: 'Tailwind CSS',
        },
      ],
    },
  },
  {
    rank: 2,
    userId: '481405fa-31bb-44a5-95f6-c4c3508d54ed',
    nickname: '박백엔드',
    totalStudyTime: 541440,
    averageStudyTime: 28496.842105263157,
    profile: {
      career: '4 - 7년',
      purpose: '이직 준비',
      profileImage: null,
      techStacks: [
        {
          id: 14493,
          name: 'Node.js',
        },
        {
          id: 14494,
          name: 'Express.js',
        },
        {
          id: 14495,
          name: 'Fastify',
        },
        {
          id: 14496,
          name: 'NestJS',
        },
        {
          id: 14518,
          name: 'PostgreSQL',
        },
        {
          id: 14521,
          name: 'Redis',
        },
        {
          id: 14534,
          name: 'Docker',
        },
      ],
    },
  },
  {
    rank: 3,
    userId: 'fa8bce24-2f2d-488d-8d1c-3bbf1f5c4770',
    nickname: '이풀스택',
    totalStudyTime: 449040,
    averageStudyTime: 26414.117647058825,
    profile: {
      career: '8 - 10년',
      purpose: '회사 내 프로젝트 원활하게 수행',
      profileImage: null,
      techStacks: [
        {
          id: 14469,
          name: 'HTML5',
        },
        {
          id: 14470,
          name: 'CSS3',
        },
        {
          id: 14471,
          name: 'JavaScript',
        },
        {
          id: 14472,
          name: 'TypeScript',
        },
        {
          id: 14473,
          name: 'React',
        },
        {
          id: 14474,
          name: 'Vue.js',
        },
        {
          id: 14493,
          name: 'Node.js',
        },
        {
          id: 14494,
          name: 'Express.js',
        },
        {
          id: 14495,
          name: 'Fastify',
        },
        {
          id: 14496,
          name: 'NestJS',
        },
      ],
    },
  },
  {
    rank: 4,
    userId: '7b8a6fab-b6c6-44bd-bbf5-51733f18bcc2',
    nickname: '최주니어',
    totalStudyTime: 432840,
    averageStudyTime: 25461.176470588234,
    profile: {
      career: '경력 없음',
      purpose: '취업 준비',
      profileImage: null,
      techStacks: [
        {
          id: 14469,
          name: 'HTML5',
        },
        {
          id: 14470,
          name: 'CSS3',
        },
        {
          id: 14471,
          name: 'JavaScript',
        },
        {
          id: 14472,
          name: 'TypeScript',
        },
        {
          id: 14473,
          name: 'React',
        },
      ],
    },
  },
  {
    rank: 5,
    userId: 'ba7f916e-d7cd-4d70-877e-d651f4164f0d',
    nickname: '테스트계정',
    totalStudyTime: 339600,
    averageStudyTime: 28300,
    profile: {
      career: '경력 없음',
      purpose: '취업 준비',
      profileImage: null,
      techStacks: [
        {
          id: 14469,
          name: 'HTML5',
        },
        {
          id: 14470,
          name: 'CSS3',
        },
        {
          id: 14471,
          name: 'JavaScript',
        },
        {
          id: 14472,
          name: 'TypeScript',
        },
        {
          id: 14473,
          name: 'React',
        },
      ],
    },
  },
];

const meta = {
  title: 'Features/RankingItem',
  component: RankingItem,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '랭킹 목록에서 사용자 순위, 프로필, 학습 시간을 표시하는 컴포넌트입니다.',
      },
    },
  },
  argTypes: {
    data: { description: '랭킹 사용자 데이터 (순위, 닉네임, 프로필, 학습 시간 등)' },
  },
  args: {
    data: MOCK_RANKINGS_DATA[3],
  },
  globals: {
    backgrounds: { value: 'dark' },
  },
} satisfies Meta<typeof RankingItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Top3: Story = {
  args: {
    data: MOCK_RANKINGS_DATA[0],
  },
};

export const Default: Story = {};

export const List: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      {MOCK_RANKINGS_DATA.map(data => (
        <RankingItem data={data} key={data.userId} />
      ))}
    </div>
  ),
};
