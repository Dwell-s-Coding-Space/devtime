import { useEffect, useState } from 'react';
import Button from '@/src/shared/components/button/Button';
import Portal from '@/src/shared/components/modal/Portal';
import TodoItem from './TodoItem';

interface TodoModalProps {
  onClose: () => void;
  onConfirm: () => void;
  onCancel: () => void;
}

const TodoModal = ({ onClose, onConfirm, onCancel }: TodoModalProps) => {
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState<string[]>([]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleAddTodo = () => {
    setTodos(prev => [...prev, inputValue]);
    setInputValue('');
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
          <input
            type="text"
            placeholder="오늘의 목표"
            className="placeholder-text-disabled-300 text-text-secondary text-[36px] leading-[46px] font-bold outline-none"
          />
          <div className="flex flex-col gap-2">
            <label htmlFor="todo" className="label-m text-text-g600">
              할 일 목록
            </label>
            <div className="bg-background-gray-dark flex items-center gap-4 rounded-[8px] px-6 py-4">
              <input
                id="todo"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                className="placeholder:body-m placeholder:text-text-disabled-300 body-m text-text-g600 flex-1 outline-none"
                placeholder="할 일을 추가해 주세요."
              />
              <button
                disabled={!inputValue}
                onClick={handleAddTodo}
                className="disabled:body-b disabled:text-text-disabled-400 body-b text-text-primary"
              >
                추가
              </button>
            </div>
          </div>
          <div className="flex h-full max-h-[460px] flex-col gap-3 overflow-y-scroll">
            {todos.map(todo => (
              <TodoItem key={todo} todo={todo} />
            ))}
          </div>
          <div className="flex items-center justify-end gap-4">
            <Button variant="tertiary" onClick={onCancel}>
              취소
            </Button>
            <Button variant="secondary">타이머 시작하기</Button>
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default TodoModal;
