import { ComponentProps } from 'react';

import { cn } from '@/src/shared/utils/cn';

type GoalProps =
  | ({ mode: 'view' } & ComponentProps<'h2'>)
  | ({ mode?: 'edit' } & ComponentProps<'input'>);

const Goal = (props: GoalProps) => {
  return (
    <>
      {props.mode === 'view' ? (
        <h2 {...props} className={cn('heading-dashboard text-text-secondary', props.className)} />
      ) : (
        <input
          type="text"
          placeholder="오늘의 목표"
          {...props}
          className={cn(
            'placeholder-text-disabled-300 heading-dashboard text-text-secondary',
            props.className
          )}
        />
      )}
    </>
  );
};

export default Goal;
