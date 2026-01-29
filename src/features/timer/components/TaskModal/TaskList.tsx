import { ComponentProps } from 'react';
import { cn } from '@/src/lib/utils';
import EditIcon from '@/src/shared/assets/svg/edit.svg';
import TaskItem from './TaskItem';

type TaskMode = 'check' | 'view' | 'edit';

interface TaskListProps extends ComponentProps<'div'> {
  mode: TaskMode;
  tasks: string[];
}

const TaskList = ({ mode, tasks, className }: TaskListProps) => {
  return (
    <div className={cn('flex min-h-0 flex-1 flex-col gap-6', className)}>
      <div className="flex items-center gap-4">
        <h3 className="text-text-g700 title-b flex-1">할 일 목록</h3>
        <button className="flex items-center gap-2">
          <EditIcon className="text-text-g600 h-6 w-6" />
          {mode === 'check' && <span className="label-m text-text-g600">할 일 수정</span>}
        </button>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto">
        {tasks.map(task => (
          <TaskItem key={task} task={task} />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
