import { useEffect, useState } from 'react';
import Button from '@/src/shared/components/button/Button';
import Portal from '@/src/shared/components/modal/Portal';
import TodoItem from './TaskModal/TaskItem';
import { useMutation } from '@tanstack/react-query';
import { clientApi } from '@/src/lib/api/client';
import { createTimerApi } from '../timer.api';
import { TimerMode } from '@/app/(navbar)/home/page';
import Goal from './TaskModal/Goal';
import TextField from '@/src/shared/components/text-field/TextField';
import AddTaskItem from './TaskModal/AddTaskItem';
import TaskList from './TaskModal/TaskList';

/**
 *   타이머 상태 :
 * not-started : 재생버튼만 활성화 ->투두 모달 : start
 * running : 일시정지, 스탑 버튼만 활성화  -> 투두 모달 : running
 * paused : 재생, 스탑 버튼만 활성화 -> 투두 모달 : running
 *                             -> 투두 모달 : stop
 */

const TaskItem = () => {};

interface TaskModalProps {
  onClose: () => void;
  onConfirm: () => void;
  onCancel: () => void;
  mode: TimerMode;
}

const TaskModal = ({ onClose, onConfirm, onCancel, mode }: TaskModalProps) => {
  const [goal, setGoal] = useState('');
  const [newTodo, setNewTodo] = useState('');
  const [todos, setTodos] = useState<string[]>([]);

  console.log('mode', mode);

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

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleAddTodo = () => {
    if (!newTodo) return;
    if (todos.some(todo => todo === newTodo)) {
      alert('이미 같은 할 일이 존재합니다.');
      return;
    }
    setTodos(prev => [...prev, newTodo]);
    setNewTodo('');
  };

  const onTimerStart = () => {
    mutate({ todayGoal: goal, tasks: todos });
  };

  return (
    <Portal>
      <div
        // onClick={onClose}
        className="bg-dim-b50 fixed top-0 left-0 z-50 flex h-screen w-full items-center justify-center overflow-hidden"
        style={{
          paddingBlock: `clamp(30px, calc(126 / 1080 * 100vh), 126px)`,
        }}
      >
        <div className="bg-background-white mx-auto flex h-full w-full max-w-[640px] flex-col gap-9 rounded-[12px] p-9 pt-12">
          <Goal mode="edit" value={goal} onChange={e => setGoal(e.target.value)} />
          <AddTaskItem
            value={newTodo}
            onChange={e => setNewTodo(e.target.value)}
            onKeyDown={e => {
              if (e.key !== 'Enter') return;
              console.log('enter');
              handleAddTodo();
            }}
            onClick={handleAddTodo}
          />
          <TaskList tasks={todos} mode="edit" />
          <div className="flex items-center justify-end gap-4">
            <Button variant="tertiary" onClick={onCancel}>
              취소
            </Button>
            <Button variant="secondary" onClick={onTimerStart}>
              타이머 시작하기
            </Button>
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default TaskModal;
