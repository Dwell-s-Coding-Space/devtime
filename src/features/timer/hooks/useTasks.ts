import { useState } from 'react';
import { TaskItem } from '../../dashboard/dashboard.schema';

const useTasks = ({ initialTasks = [] }: { initialTasks?: TaskItem[] }) => {
  const [newTaskContent, setNewTaskContent] = useState('');
  const [tasks, setTasks] = useState<TaskItem[]>(initialTasks);

  const addTask = () => {
    if (!newTaskContent.trim()) return;
    if (tasks.some(task => task.content === newTaskContent)) return;

    setTasks(prev => [
      ...prev,
      { id: `id-${Date.now()}-${Math.random()}`, content: newTaskContent, isCompleted: false },
    ]);
    setNewTaskContent('');
  };

  const deleteTask = (taskId: string) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const updateTask = (data: Partial<TaskItem>) => {
    const updatedTasks = tasks.map(task => (task.id === data.id ? { ...task, ...data } : task));
    setTasks(updatedTasks);
  };

  const getTasksPayload = () => {
    return tasks.map(({ content, isCompleted }) => ({ content, isCompleted }));
  };

  return {
    addTask,
    deleteTask,
    updateTask,
    setNewTaskContent,
    tasks,
    newTaskContent,
    getTasksPayload,
  };
};

export default useTasks;
