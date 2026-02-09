import { ComponentProps } from 'react';
import { cn } from '@/src/shared/utils/cn';
import { EditIcon } from '@/src/shared/assets/svg';
import type { TaskItem as TaskItemType } from '@/src/features/dashboard/dashboard.schema';
import type { TaskMode } from '../../timer.types';
import TaskItem from './TaskItem';

interface TaskListProps extends ComponentProps<'div'> {
  mode: TaskMode;
  tasks: TaskItemType[];
  handleChange?: (data: Partial<TaskItemType>) => void;
  handleDelete?: (id: string) => void;
  changeTaskMode?: (newMode: TaskMode) => void;
}

const TaskList = ({
  mode,
  tasks,
  className,
  handleChange,
  handleDelete,
  changeTaskMode,
}: TaskListProps) => {
  const changeToEditMode = () => {
    if (!changeTaskMode) return;
    changeTaskMode('edit');
  };

  return (
    <div className={cn('flex min-h-0 flex-1 flex-col gap-6', className)}>
      <div className="flex items-center gap-4">
        <h3 className="text-text-g700 title-b flex-1">할 일 목록</h3>
        {mode === 'check' && (
          <button className="flex items-center gap-2" onClick={changeToEditMode}>
            <EditIcon className="text-text-g600 h-6 w-6" />
            <span className="label-m text-text-g600">할 일 수정</span>
          </button>
        )}
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto">
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            mode={mode}
            handleChange={handleChange}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
