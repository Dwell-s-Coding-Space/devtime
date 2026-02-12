import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { dashboardQueries } from '../../dashboard/dashboard.queries';
import { GetStudyLogDetailResponse } from '../../dashboard/dashboard.schema';
import { useTasks } from '../hooks';
import { timerQueries } from '../timer.queries';
import type { TaskModalProps, TaskMode } from '../timer.types';
import { AddTaskItem, TaskList, TaskModalFooter, TaskModalLayout } from './TaskModal';

export interface TimerRunningModalProps extends TaskModalProps {
  onClose: () => void;
  data?: GetStudyLogDetailResponse['data'];
}

const TimerRunningModal = ({ onClose, data }: TimerRunningModalProps) => {
  const queryClient = useQueryClient();
  const [taskMode, setTaskMode] = useState<TaskMode>('check');

  const {
    newTaskContent,
    setNewTaskContent,
    tasks,
    addTask,
    updateTask,
    deleteTask,
    getTasksPayload,
  } = useTasks({
    initialTasks: data?.tasks,
  });

  const { mutate } = useMutation({
    ...timerQueries.updateTask(),
    onError: error => {
      alert(`변경사항을 저장하는데 실패했습니다.\n다시 시도 해주세요.\n${error.message}`);
    },
    onSuccess: () => {
      alert('성공적으로 저장하였습니다.');
      queryClient.invalidateQueries({
        queryKey: dashboardQueries.studyLogDetail(data?.id || '').queryKey,
      });
      if (taskMode === 'check') {
        onClose();
      } else {
        setTaskMode('check');
      }
    },
  });

  const changeTaskMode = (newTaskMode: TaskMode) => {
    setTaskMode(newTaskMode);
  };

  const handleSave = () => {
    if (!tasks?.length || !data) return;
    mutate({ studyLogId: data.id, reqBody: { tasks: getTasksPayload() } });
  };

  return (
    <TaskModalLayout>
      <AddTaskItem
        value={newTaskContent}
        onChange={e => setNewTaskContent(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
            e.preventDefault();
            addTask();
          }
        }}
        onClick={addTask}
      />
      <TaskList
        tasks={tasks}
        mode={taskMode}
        handleChange={updateTask}
        handleDelete={deleteTask}
        changeTaskMode={changeTaskMode}
      />
      <TaskModalFooter
        onCancel={onClose}
        onConfirm={handleSave}
        confirmText={taskMode === 'edit' ? '변경 사항 저장하기' : '저장하기'}
      />
    </TaskModalLayout>
  );
};

export default TimerRunningModal;
