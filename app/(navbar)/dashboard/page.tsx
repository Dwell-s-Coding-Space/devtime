import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { getTokens } from '@/src/features/auth/auth.utils';
import { DashboardBoundary } from '@/src/features/dashboard';
import { createDashboardApi } from '@/src/features/dashboard/dashboard.api';
import { dashboardQueries } from '@/src/features/dashboard/dashboard.queries';
import { createServerApi } from '@/src/shared/api/server';
import { getQueryClient } from '@/src/shared/providers/get-query-client';

export default async function Dashboard() {
  const queryClient = getQueryClient();
  const serverApi = await createServerApi();
  const dashboardApi = createDashboardApi(serverApi);
  const { accessToken } = await getTokens();

  if (accessToken) {
    await Promise.all([
      queryClient.prefetchQuery({ ...dashboardQueries.stats(), queryFn: dashboardApi.getStats }),
      queryClient.prefetchQuery({
        ...dashboardQueries.heatmap(),
        queryFn: dashboardApi.getHeatmap,
      }),
      queryClient.prefetchQuery({
        ...dashboardQueries.studyLogs({}),
        queryFn: () => dashboardApi.getStudyLogs({}),
      }),
    ]);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DashboardBoundary />
    </HydrationBoundary>
  );
}
