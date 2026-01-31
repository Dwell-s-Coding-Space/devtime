import { ChangeEvent, MouseEvent, useState } from 'react';
import { TaskMode } from '@/app/(navbar)/home/page';
import { cn } from '@/src/lib/utils';
import SymbolIcon from '@/src/shared/assets/svg/symbol.svg';
import EditIcon from '@/src/shared/assets/svg/edit.svg';
import TrashIcon from '@/src/shared/assets/svg/trash.svg';
import CheckIcon from '@/src/shared/assets/svg/check.svg';
import Checkbox from '@/src/shared/components/checkbox/Checkbox';
import type { TaskItem as TaskItemType } from '@/src/features/dashboard/dashboard.schema';

interface TaskItemProps {
  task: TaskItemType;
  mode: TaskMode;
  handleChange?: (data: Partial<TaskItemType>) => void;
  handleDelete?: (id: string) => void;
}

const TaskItem = ({ task, mode, handleChange, handleDelete }: TaskItemProps) => {
  const checkboxId = `task-checkbox-${task.id}`;

  const [isEdit, setIsEdit] = useState(false);
  const [value, setValue] = useState(task.content || '');

  const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
    if (!handleChange) return;

    handleChange({ ...task, isCompleted: e.target.checked });
  };

  const handleEdit = (e: MouseEvent<HTMLButtonElement>) => {
    setIsEdit(true);
  };

  const handleRealEdit = () => {
    if (!handleChange) return;
    handleChange({ ...task, content: value });
    setIsEdit(false);
  };

  const onDelete = () => {
    if (!handleDelete) return;
    handleDelete(task.id);
  };

  return (
    <label
      htmlFor={checkboxId}
      className={cn('bg-background-primary flex h-18 items-center gap-4 rounded-[8px] p-6', {
        'bg-background-disabled-dark': task.isCompleted,
      })}
    >
      <SymbolIcon className="text-background-white/50 h-5 w-[42px]" />

      <input
        value={value}
        onChange={e => setValue(e.target.value)}
        readOnly={isEdit ? false : true}
        className="body-s text-text-white flex-1"
      />

      {mode === 'edit' &&
        (isEdit ? (
          <button onClick={handleRealEdit}>
            <CheckIcon className="h-6 w-6 text-white" />
          </button>
        ) : (
          <>
            <button onClick={handleEdit}>
              <EditIcon className="h-6 w-6 text-white" />
            </button>

            <button onClick={onDelete}>
              <TrashIcon className="h-6 w-6 text-white" />
            </button>
          </>
        ))}

      {mode === 'check' && (
        <Checkbox id={checkboxId} checked={task.isCompleted} onChange={handleCheck} />
      )}
    </label>
  );
};

export default TaskItem;
