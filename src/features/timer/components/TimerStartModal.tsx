import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { dashboardQueries } from '../../dashboard/dashboard.queries';
import { useTasks } from '../hooks';
import { timerQueries } from '../timer.queries';
import type { TaskModalProps } from '../timer.types';
import { AddTaskItem, Goal, TaskList, TaskModalFooter, TaskModalLayout } from './TaskModal';

interface TimerStartModalProps extends TaskModalProps {
  startTimer: () => void;
}

const TimerStartModal = ({ onClose, startTimer }: TimerStartModalProps) => {
  const queryClient = useQueryClient();
  const [goal, setGoal] = useState('');
  const { newTaskContent, setNewTaskContent, tasks, addTask, deleteTask, updateTask } = useTasks(
    {}
  );

  const { mutate } = useMutation({
    ...timerQueries.startTimer(),
    onError: error => {
      alert(`타이머를 시작하는데 오류가 발생했습니다.\n다시 시도 해주세요.\n${error.message}`);
    },
    onSuccess: () => {
      alert('타이머가 성공적으로 시작하였습니다.');
      startTimer();
      queryClient.invalidateQueries({ queryKey: timerQueries.current().queryKey });
      queryClient.invalidateQueries({ queryKey: dashboardQueries.studyLogs({}).queryKey });
      onClose();
    },
  });

  const handleStart = () => {
    mutate({ todayGoal: goal, tasks: tasks.map(task => task.content) });
  };

  return (
    <TaskModalLayout>
      <Goal mode="edit" value={goal} onChange={e => setGoal(e.target.value)} />
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
      <TaskList tasks={tasks} mode="edit" handleChange={updateTask} handleDelete={deleteTask} />
      <TaskModalFooter onCancel={onClose} onConfirm={handleStart} confirmText="타이머 시작하기" />
    </TaskModalLayout>
  );
};

export default TimerStartModal;
