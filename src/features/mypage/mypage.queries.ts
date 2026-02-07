import { queryOptions } from '@tanstack/react-query';
import { clientApi } from '@/src/shared/api/client';
import { createMyPageApi } from './mypage.api';

const mypageApi = createMyPageApi(clientApi);

export const mypageQueries = {
  //queries
  profile: () =>
    queryOptions({
      queryKey: ['mypage', 'profile'],
      queryFn: mypageApi.getProfile,
    }),
  techStacks: () =>
    queryOptions({
      queryKey: ['mypage', 'techStacks'],
      queryFn: mypageApi.getTechStacks,
    }),

  //mutations
  createProfile: () => ({
    mutationFn: mypageApi.postProfile,
  }),
  updateProfile: () => ({
    mutationFn: mypageApi.putProfile,
  }),
  createTechStack: () => ({
    mutationFn: mypageApi.postTechStacks,
  }),
};
