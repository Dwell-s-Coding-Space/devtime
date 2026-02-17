import { ResetIcon, TodoIcon } from '@/src/shared/assets/svg';
import IconButton from '@/src/shared/components/button/IconButton';

const TimerSubController = ({
  handleTask,
  handleDelete,
}: {
  handleTask: () => void;
  handleDelete: () => void;
}) => {
  return (
    <div className="flex items-center gap-6">
      <IconButton
        aria-label="현재 할 일 목록 열기"
        className="bg-background-white flex h-16 w-16 items-center justify-center rounded-full"
        onClick={handleTask}
      >
        <TodoIcon className="text-text-primary h-12 w-12" />
      </IconButton>
      <IconButton
        aria-label="타이머 초기화"
        className="bg-background-white flex h-16 w-16 items-center justify-center rounded-full"
        onClick={handleDelete}
      >
        <ResetIcon className="text-text-primary h-12 w-12" />
      </IconButton>
    </div>
  );
};

export default TimerSubController;
