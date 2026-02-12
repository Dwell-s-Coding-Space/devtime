import { useQuery } from '@tanstack/react-query';

import { authQueries } from '../../auth/auth.queries';
import { dashboardQueries } from '../../dashboard/dashboard.queries';
import { timerQueries } from '../timer.queries';

const TimerHeader = () => {
  const { data: isLoggedIn } = useQuery(authQueries.checkIsLoggedIn());

  const { data } = useQuery({
    ...timerQueries.current(),
    enabled: !!isLoggedIn,
  });

  const { data: studyLogData } = useQuery({
    ...dashboardQueries.studyLogDetail(data?.studyLogId || ''),
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
