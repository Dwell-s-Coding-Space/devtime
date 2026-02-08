import { GetStudyStatResponse } from '../dashboard.schema';
import { SECONDS_IN_HOUR } from '../../timer/utils/formatTime';

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const WeeklyStatBar = ({ data }: { data: GetStudyStatResponse['weekdayStudyTime'] }) => {
  return (
    <div className="bg-content-primary flex h-[264px] flex-1 justify-between rounded-[18px] py-6 pr-12 pl-[30px]">
      <h3 className="subtitle-s text-text-white">요일별 공부 시간 평균</h3>
      <div className="flex items-start gap-2 pt-7">
        <div className="flex w-[80px] flex-col gap-10">
          {[24, 16, 8].map(val => (
            <p key={val} className="border-t-dim-w50 text-dim-w50 caption-b border-t pt-1">
              {val}시간
            </p>
          ))}
        </div>

        {WEEKDAYS.map(weekday => {
          const value = data[weekday as keyof typeof data];
          const label = weekday.charAt(0);
          const percent = (value / (24 * SECONDS_IN_HOUR)) * 100;

          return (
            <div className="flex flex-col gap-2" key={weekday}>
              <div className="border-content-white bg-background-white/50 relative h-[160px] w-9 rounded-[5px] border-[0.5px] border-dashed">
                <div
                  className="bg-content-white absolute bottom-0 left-0 w-full"
                  style={{ height: `${percent}%` }}
                />
              </div>
              <div className="bg-background-white/50 text-text-secondary caption-b mx-auto flex h-5 w-5 items-center justify-center rounded-full">
                {label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeeklyStatBar;
