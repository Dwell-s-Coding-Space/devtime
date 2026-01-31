import type { TaskItem } from '@/src/features/dashboard/dashboard.schema';

export type TaskMode = 'check' | 'view' | 'edit';
export type ModalType = 'start' | 'running' | 'stop';
export type TimerStatus = 'idle' | 'running' | 'paused';

export interface TaskModalProps {
  onClose: () => void;
}

export interface TaskModalWithDataProps extends TaskModalProps {
  studyLogId: string;
  timerId?: string;
  initialTasks?: TaskItem[];
}
