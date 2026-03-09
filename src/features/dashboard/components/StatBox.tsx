import type { Seconds } from '@/src/shared/schema/time.schema';
import { secondsToDuration } from '@/src/shared/utils/formatTime';

type StatBoxProps =
  | { type: 'time'; label: string; value: Seconds }
  | { type: 'day'; label: string; value: number }
  | { type: 'rate'; label: string; value: number };

const ValueUnit = ({ value, unit }: { value: number; unit: string }) => (
  <>
    <span className="text-[36px] leading-[46px] font-bold">{value}</span>
    <span className="body-m pb-[6px]">{unit}</span>
  </>
);

const StatBox = ({ value, label, type }: StatBoxProps) => {
  const duration = type === 'time' ? secondsToDuration(value) : null;

  return (
    <div className="bg-background-white flex w-[240px] flex-col gap-2 rounded-[18px] p-6">
      <dt className="subtitle-s text-text-g500">{label}</dt>
      <dd className="text-text-secondary flex items-end justify-end gap-1">
        {type === 'rate' && <ValueUnit value={Math.round(value)} unit="%" />}
        {type === 'day' && <ValueUnit value={value} unit="일째" />}
        {type === 'time' && duration && (
          <>
            {duration.hours > 0 && <ValueUnit value={duration.hours} unit="시간" />}
            {duration.minutes > 0 && <ValueUnit value={duration.minutes} unit="분" />}
            {duration.hours === 0 && duration.minutes === 0 && <ValueUnit value={0} unit="분" />}
          </>
        )}
      </dd>
    </div>
  );
};

export default StatBox;
