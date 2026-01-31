import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { clientApi } from '@/src/lib/api/client';
import { createTimerApi } from '../timer.api';
import type { TaskModalProps } from '../timer.types';
import { useTasks } from '../hooks';
import { TaskModalFooter, TaskModalLayout, Goal, AddTaskItem, TaskList } from './TaskModal';

const TimerStartModal = ({ onClose }: TaskModalProps) => {
  const [goal, setGoal] = useState('');
  const { newTaskContent, setNewTaskContent, tasks, addTask, deleteTask, updateTask } = useTasks(
    {}
  );

  const { mutate } = useMutation({
    mutationFn: createTimerApi(clientApi).postStart,
    onError: error => {
      alert(`타이머를 시작하는데 오류가 발생했습니다.\n다시 시도 해주세요.\n${error.message}`);
    },
    onSuccess: () => {
      alert('타이머가 성공적으로 시작하였습니다.');
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
        onKeyDown={e => e.key === 'Enter' && addTask()}
        onClick={addTask}
      />
      <TaskList tasks={tasks} mode="edit" handleChange={updateTask} handleDelete={deleteTask} />
      <TaskModalFooter onCancel={onClose} onConfirm={handleStart} confirmText="타이머 시작하기" />
    </TaskModalLayout>
  );
};

export default TimerStartModal;
