import { ChangeEvent, useState } from 'react';
import { cn } from '@/src/shared/utils/cn';
import Checkbox from '@/src/shared/components/checkbox/Checkbox';
import { CheckIcon, EditIcon, SymbolIcon, TrashIcon } from '@/src/shared/assets/svg';
import type { TaskItem as TaskItemType } from '@/src/features/dashboard/dashboard.schema';
import { TaskMode } from '../../timer.types';

interface TaskItemProps {
  task: TaskItemType;
  mode: TaskMode;
  handleChange?: (data: Partial<TaskItemType>) => void;
  handleDelete?: (id: string) => void;
}

const TaskItem = ({ task, mode, handleChange, handleDelete }: TaskItemProps) => {
  const checkboxId = `task-checkbox-${task.id}`;

  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(task.content || '');

  const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange?.({ ...task, isCompleted: e.target.checked });
  };

  const handleEditConfirm = () => {
    handleChange?.({ ...task, content: editValue });
    setIsEditing(false);
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
        value={editValue}
        onChange={e => setEditValue(e.target.value)}
        readOnly={!isEditing}
        className="body-s text-text-white flex-1 bg-transparent"
      />

      {mode === 'edit' &&
        (isEditing ? (
          <button onClick={handleEditConfirm}>
            <CheckIcon className="h-6 w-6 text-white" />
          </button>
        ) : (
          <>
            <button onClick={() => setIsEditing(true)}>
              <EditIcon className="h-6 w-6 text-white" />
            </button>
            <button onClick={() => handleDelete?.(task.id)}>
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
