import { useMemo } from 'react';
import { cn } from '@/src/lib/utils';
import { GetHeatmapListResponse } from '../dashboard.schema';
import { getYearlyDates } from '../utils/getYearlyDates';

const KOR_WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const SEA_LEVEL = {
  1: '#B8CAFF',
  2: '#87A6FF',
  3: '#4C79FF',
  4: '#1E50E5',
  5: '#023E99',
};

const YearlyStatGrid = ({ data }: { data: GetHeatmapListResponse['heatmap'] }) => {
  const currentYear = new Date().getFullYear();
  const yearlyDates = useMemo(() => getYearlyDates(currentYear), [currentYear]);

  const weeks = useMemo(() => {
    const result: string[][] = [];
    for (let i = 0; i < yearlyDates.length; i += 7) {
      result.push(yearlyDates.slice(i, i + 7));
    }
    return result;
  }, [yearlyDates]);

  const monthLabels = useMemo(() => {
    return weeks.map(week => {
      const firstOfMonth = week.find(dateStr => dateStr.endsWith('-01'));
      if (firstOfMonth && new Date(firstOfMonth).getFullYear() === currentYear) {
        return MONTHS[new Date(firstOfMonth).getMonth()];
      }

      return null;
    });
  }, [weeks, currentYear]);

  const dataObj = useMemo(() => {
    const obj = {} as Record<string, { studyTimeHours: number; colorLevel: number }>;
    data.map(
      d =>
        (obj[d.date?.toString() as string] = {
          studyTimeHours: d.studyTimeHours,
          colorLevel: d.colorLevel,
        })
    );

    return obj;
  }, [data]);

  return (
    <div className="bg-background-white flex flex-col gap-6 rounded-[18px] p-6">
      <h3 className="subtitle-s text-text-disabled-400">공부 시간 바다</h3>
      <div className="flex gap-4">
        {/* Weekday Label */}
        <div className="flex flex-col gap-[3px]">
          <div className="mb-2 h-[16px]" />
          {KOR_WEEKDAYS.map(weekday => (
            <span key={weekday} className="caption-m text-text-g600 flex h-[18px] items-center">
              {weekday}
            </span>
          ))}
        </div>

        {/* Week Rendering */}
        <div className="flex gap-[3px]">
          {weeks.map((week, weekIdx) => (
            <div className="flex flex-col gap-2" key={weekIdx}>
              {/* Month Label */}
              <div className="relative h-[16px]">
                {monthLabels[weekIdx] && (
                  <span className="caption-m text-text-g600 absolute top-0 left-0">
                    {monthLabels[weekIdx]}
                  </span>
                )}
              </div>

              {/* Week Dates */}
              <div className="flex flex-col gap-[3px]" key={weekIdx}>
                {week.map(date => {
                  const isDisabled = !date.includes(currentYear.toString());
                  const cellData = dataObj[date];
                  const color = cellData
                    ? SEA_LEVEL[cellData.colorLevel as keyof typeof SEA_LEVEL]
                    : undefined;

                  return (
                    <div className="group relative" key={date}>
                      <div
                        style={{ backgroundColor: color }}
                        className={cn('h-[18px] w-[18px] rounded-[5px]', {
                          'border-border-gray bg-background-gray-light border':
                            !color && !isDisabled,
                          'bg-background-disabled': isDisabled,
                        })}
                      />
                      <div
                        className={cn(
                          'label-r bg-text-g800 text-text-white absolute bottom-full left-1/2 z-20 mb-1 hidden -translate-x-1/2 rounded-[3px] px-2 py-1 whitespace-nowrap',
                          {
                            'group-hover:block': !isDisabled,
                          }
                        )}
                      >
                        {cellData?.studyTimeHours || '기록 없음'}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="caption-s" style={{ color: SEA_LEVEL[1] }}>
          Shallow
        </span>
        <div className="flex h-5 w-[150px] overflow-hidden rounded-[5px]">
          {Object.values(SEA_LEVEL).map(color => (
            <div key={color} className="flex-1" style={{ backgroundColor: color }} />
          ))}
        </div>
        <span className="caption-s" style={{ color: SEA_LEVEL[5] }}>
          Deep
        </span>
      </div>
    </div>
  );
};

export default YearlyStatGrid;
