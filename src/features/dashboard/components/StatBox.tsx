import { formatTime, MS_IN_SECONDS } from '@/src/features/timer/utils/formatTime';

interface StatBoxProps {
  label: string;
  value: number;
  type: 'time' | 'day' | 'rate';
}

const StatBox = ({ value, label, type }: StatBoxProps) => {
  const formattedTime = type === 'time' ? formatTime(value * MS_IN_SECONDS) : null;

  return (
    <div className="bg-background-white flex w-[240px] flex-col gap-2 rounded-[18px] p-6">
      <dt className="subtitle-s text-text-g500">{label}</dt>
      <dd className="text-text-secondary flex items-end justify-end gap-1">
        {type === 'rate' && (
          <>
            <span className="text-[36px] leading-[46px] font-bold">{value.toFixed(0)}</span>
            <span className="body-m pb-[6px]">%</span>
          </>
        )}
        {type === 'day' && (
          <>
            <span className="text-[36px] leading-[46px] font-bold">{value}</span>
            <span className="body-m pb-[6px]">일째</span>
          </>
        )}
        {type === 'time' && formattedTime && (
          <>
            <span className="text-[36px] leading-[46px] font-bold">{formattedTime.hours}</span>
            <span className="body-m pb-[6px]">시간</span>
            <span className="text-[36px] leading-[46px] font-bold">{formattedTime.minutes}</span>
            <span className="body-m pb-[6px]">분</span>
          </>
        )}
      </dd>
    </div>
  );
};

export default StatBox;
