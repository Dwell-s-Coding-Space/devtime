import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { MyPageEditBoundary } from '@/src/features/mypage';
import { createMyPageApi } from '@/src/features/mypage/mypage.api';
import { mypageQueries } from '@/src/features/mypage/mypage.queries';
import { createServerApi } from '@/src/shared/api/server';
import { getQueryClient } from '@/src/shared/providers/get-query-client';

export default async function MyPageEdit() {
  const queryClient = getQueryClient();
  const serverApi = await createServerApi();
  const mypageApi = createMyPageApi(serverApi);

  await queryClient.prefetchQuery({ ...mypageQueries.profile(), queryFn: mypageApi.getProfile });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MyPageEditBoundary />
    </HydrationBoundary>
  );
}
