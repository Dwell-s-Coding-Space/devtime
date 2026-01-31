import { ChangeEvent, useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Button from '@/src/shared/components/button/Button';
import Portal from '@/src/shared/components/modal/Portal';
import { clientApi } from '@/src/lib/api/client';
import type { TaskMode } from '@/app/(navbar)/home/page';
import { GetStudyLogDetailResponse, type TaskItem } from '../../dashboard/dashboard.schema';
import { createTimerApi } from '../timer.api';
import AddTaskItem from './TaskModal/AddTaskItem';
import TaskList from './TaskModal/TaskList';
import Label from '@/src/shared/components/text-field/Label';

export interface TaskModalProps {
  onClose: () => void;
  data?: GetStudyLogDetailResponse['data'];
  changeTaskMode?: (newMode: TaskMode) => void;
  timerId?: string;
}

const TimerStopModal = ({ onClose, data, timerId }: TaskModalProps) => {
  const { tasks } = data || {};
  const queryClient = useQueryClient();

  const [newTodo, setNewTodo] = useState('');
  const [todos, setTodos] = useState<TaskItem[]>(tasks || []);
  const [taskMode, setTaskMode] = useState<TaskMode>('check');
  const [reflection, setReflection] = useState('');

  const { mutate } = useMutation({
    mutationFn: createTimerApi(clientApi).putTasks,
    onError: error => {
      alert(`변경사항을 저장하는데 실패했습니다.\n다시 시도 해주세요.\n${error.message}`);
    },
    onSuccess: () => {
      alert('성공적으로 저장하였습니다.');
      queryClient.invalidateQueries({ queryKey: ['timer', data?.id] });
      onClose();
    },
  });

  const { mutate: mutateStop } = useMutation({
    mutationFn: createTimerApi(clientApi).postStop,
    onError: error => {
      alert(`공부 완료하기를 실패했습니다.\n다시 시도 해주세요.\n${error.message}`);
    },
    onSuccess: () => {
      alert('성공적으로 공부를 완료하였습니다.');
      queryClient.invalidateQueries({ queryKey: ['timer', data?.id] });
      onClose();
    },
  });

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleAddTodo = () => {
    if (!newTodo) return;
    if (todos.some(todo => todo.content === newTodo)) {
      alert('이미 같은 할 일이 존재합니다.');
      return;
    }

    setTodos(prev => [...prev, { id: `id-${newTodo}`, content: newTodo, isCompleted: false }]);
    setNewTodo('');
  };

  const changeTaskMode = (newTaskMode: TaskMode) => {
    setTaskMode(newTaskMode);
  };

  const handleTaskItemUpdate = (data: Partial<TaskItem>) => {
    const updatedTodos = todos.map(todo => (todo.id === data.id ? { ...todo, ...data } : todo));
    setTodos(updatedTodos);
  };

  const handleTaskItemDelete = (id: string) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };

  const handleSave = () => {
    if (!todos?.length || !data) return;
    const _todos = todos.map(todo => ({ content: todo.content, isCompleted: todo.isCompleted }));
    mutate({ studyLogId: data.id, reqBody: { tasks: _todos } });
  };

  const handleReflection = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    if (!value) return;
    setReflection(value);
  };

  const handleFinish = () => {
    if (!todos?.length || !data || !timerId) return;

    const _todos = todos.map(todo => ({
      content: todo.content,
      isCompleted: todo.isCompleted,
    }));

    const body = { review: reflection, tasks: _todos, splitTimes: [] };

    mutateStop({ id: timerId, reqBody: body });
  };

  return (
    <Portal>
      <div
        className="bg-dim-b50 fixed top-0 left-0 z-50 flex h-screen w-full items-center justify-center overflow-hidden"
        style={{
          paddingBlock: `30px`,
        }}
      >
        <div className="bg-background-white mx-auto flex h-full w-full max-w-[640px] flex-col gap-9 rounded-[12px] p-9 pt-12">
          <div className="flex flex-col gap-1">
            <h2 className="title-b">오늘도 수고하셨어요!</h2>
            <span className="body-m text-text-g500">
              완료한 일을 체크하고, 오늘의 학습 회고를 작성해 주세요.
            </span>
          </div>
          <AddTaskItem
            value={newTodo}
            onChange={e => setNewTodo(e.target.value)}
            onKeyDown={e => {
              if (e.key !== 'Enter') return;
              handleAddTodo();
            }}
            onClick={handleAddTodo}
          />

          <TaskList
            tasks={todos}
            mode={taskMode}
            handleChange={handleTaskItemUpdate}
            handleDelete={handleTaskItemDelete}
            changeTaskMode={changeTaskMode}
          />

          <div className="flex flex-col gap-2">
            <Label htmlFor="reflection">학습 회고</Label>
            <textarea
              value={reflection}
              onChange={handleReflection}
              className="bg-background-gray-light placeholder:text-text-disabled-300 body-m text-text-g600 h-[84px] overflow-y-scroll rounded-[5px] px-4 py-3"
              placeholder="오늘 학습한 내용을 회고해 보세요(15자 이상 작성 필수)."
            />
          </div>

          <div className="flex items-center justify-end gap-4">
            <Button variant="tertiary" onClick={onClose}>
              취소
            </Button>
            {taskMode === 'edit' ? (
              <Button variant="secondary" onClick={handleSave}>
                변경 사항 저장하기
              </Button>
            ) : (
              <Button variant="secondary" onClick={handleFinish}>
                공부 완료하기
              </Button>
            )}
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default TimerStopModal;
