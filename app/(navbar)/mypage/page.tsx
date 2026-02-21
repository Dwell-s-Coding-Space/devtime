import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { getTokens } from '@/src/features/auth/auth.utils';
import { MyPageBoundary } from '@/src/features/mypage';
import { createMyPageApi } from '@/src/features/mypage/mypage.api';
import { mypageQueries } from '@/src/features/mypage/mypage.queries';
import { createServerApi } from '@/src/shared/api/server';
import { getQueryClient } from '@/src/shared/providers/get-query-client';

export default async function MyPage() {
  const queryClient = getQueryClient();
  const serverApi = await createServerApi();
  const mypageApi = createMyPageApi(serverApi);
  const { accessToken } = await getTokens();

  if (accessToken) {
    await queryClient.prefetchQuery({ ...mypageQueries.profile(), queryFn: mypageApi.getProfile });
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MyPageBoundary />
    </HydrationBoundary>
  );
}
