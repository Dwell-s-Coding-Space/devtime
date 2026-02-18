import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import Label from '@/src/shared/components/form/Label';

import { dashboardQueries } from '../../dashboard/dashboard.queries';
import { GetStudyLogDetailResponse } from '../../dashboard/dashboard.schema';
import { useTasks } from '../hooks';
import { timerQueries } from '../timer.queries';
import type { TaskModalProps, TaskMode } from '../timer.types';
import { AddTaskItem, TaskList, TaskModalFooter, TaskModalLayout } from './TaskModal';

export interface TimerStopModalProps extends TaskModalProps {
  data?: GetStudyLogDetailResponse['data'];
  timerId?: string;
  stopTimer: () => void;
}

const TimerStopModal = ({ onClose, data, timerId, stopTimer }: TimerStopModalProps) => {
  const queryClient = useQueryClient();
  const [taskMode, setTaskMode] = useState<TaskMode>('check');
  const [reflection, setReflection] = useState('');

  const {
    tasks,
    newTaskContent,
    setNewTaskContent,
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
      setTaskMode('check');
    },
  });

  const { mutate: mutateStop } = useMutation({
    ...timerQueries.stopTimer(),
    onError: error => {
      alert(`공부 완료하기를 실패했습니다.\n다시 시도 해주세요.\n${error.message}`);
    },
    onSuccess: () => {
      alert('성공적으로 공부를 완료하였습니다.');
      stopTimer();
      queryClient.removeQueries({ queryKey: timerQueries.current().queryKey });
      queryClient.removeQueries({ queryKey: dashboardQueries.studyLogs({}).queryKey });
      onClose();
    },
  });

  const changeTaskMode = (newTaskMode: TaskMode) => {
    setTaskMode(newTaskMode);
  };

  const handleSave = () => {
    if (!tasks?.length || !data) return;
    mutate({ studyLogId: data.id, reqBody: { tasks: getTasksPayload() } });
  };

  const handleFinish = () => {
    if (!tasks?.length || !data || !timerId) return;

    mutateStop({
      id: timerId,
      reqBody: { review: reflection, tasks: getTasksPayload(), splitTimes: [] },
    });
  };

  return (
    <TaskModalLayout>
      <div className="flex flex-col gap-1">
        <h2 className="title-b">오늘도 수고하셨어요!</h2>
        <span className="body-m text-text-g500">
          완료한 일을 체크하고, 오늘의 학습 회고를 작성해 주세요.
        </span>
      </div>

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

      <div className="flex flex-col gap-2">
        <Label htmlFor="reflection">학습 회고</Label>
        <textarea
          value={reflection}
          onChange={e => setReflection(e.target.value)}
          className="bg-background-gray-light placeholder:text-text-disabled-300 body-m text-text-g600 h-[84px] overflow-y-scroll rounded-[5px] px-4 py-3"
          placeholder="오늘 학습한 내용을 회고해 보세요(15자 이상 작성 필수)."
        />
      </div>

      <TaskModalFooter
        onCancel={onClose}
        onConfirm={taskMode === 'edit' ? handleSave : handleFinish}
        confirmText={taskMode === 'edit' ? '변경 사항 저장하기' : '공부 완료하기'}
      />
    </TaskModalLayout>
  );
};

export default TimerStopModal;
