import { useQuery } from '@tanstack/react-query';
import { clientApi } from '@/src/shared/api/client';
import { checkIsLoggedIn } from '../../auth/auth.action';
import { createDashboardApi } from '../../dashboard/dashboard.api';
import { createTimerApi } from '../timer.api';

const TimerHeader = () => {
  const { data: isLoggedIn } = useQuery({
    queryKey: ['auth'],
    queryFn: checkIsLoggedIn,
  });

  const { data } = useQuery({
    queryKey: ['current timer'],
    queryFn: createTimerApi(clientApi).getCurrent,
    enabled: !!isLoggedIn,
  });

  const { data: studyLogData } = useQuery({
    queryKey: ['timer', data?.studyLogId],
    queryFn: () => createDashboardApi(clientApi).getStudyLogDetail(data?.studyLogId || ''),
    enabled: !!data?.studyLogId,
  });

  return (
    <>
      {!isLoggedIn ? (
        // Not Logged In
        <div className="text-text-secondary flex flex-col gap-2.5 text-center">
          <h1 className="text-[72px] leading-[86px] font-bold">WELCOME</h1>
          <span className="label-r">DevTime을 사용하려면 로그인이 필요합니다.</span>
        </div>
      ) : studyLogData?.data.todayGoal ? (
        // Has Goal
        <h1 className="text-text-secondary text-center text-[72px] leading-[86px] font-bold">
          {studyLogData.data.todayGoal}
        </h1>
      ) : (
        // Has No Goal
        <h1 className="text-text-primary-30 text-center text-[72px] leading-[86px] font-bold">
          오늘도 열심히 달려봐요!
        </h1>
      )}
    </>
  );
};

export default TimerHeader;
