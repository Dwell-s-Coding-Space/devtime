import ResetIcon from '@/src/shared/assets/svg/reset.svg';
import TodoIcon from '@/src/shared/assets/svg/todo.svg';

const TimerSubController = ({
  handleTask,
  handleDelete,
}: {
  handleTask: () => void;
  handleDelete: () => void;
}) => {
  return (
    <>
      <button
        className="bg-background-white flex h-16 w-16 items-center justify-center rounded-full"
        onClick={handleTask}
      >
        <TodoIcon className="text-text-primary h-12 w-12" />
      </button>
      <button
        className="bg-background-white flex h-16 w-16 items-center justify-center rounded-full"
        onClick={handleDelete}
      >
        <ResetIcon className="text-text-primary h-12 w-12" />
      </button>
    </>
  );
};

export default TimerSubController;
