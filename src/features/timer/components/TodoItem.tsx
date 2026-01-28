import SymbolIcon from '@/src/shared/assets/svg/symbol.svg';
import EditIcon from '@/src/shared/assets/svg/edit.svg';
import TrashIcon from '@/src/shared/assets/svg/trash.svg';

interface TodoItemProps {
  todo: string;
}

const TodoItem = ({ todo }: TodoItemProps) => {
  return (
    <div className="bg-background-primary flex h-18 items-center gap-4 rounded-[8px] p-6">
      <SymbolIcon className="text-background-white/50 h-5 w-[42px]" />
      <span className="body-s text-text-white flex-1">{todo}</span>
      <button>
        <EditIcon className="h-6 w-6 text-white" />
      </button>
      <button>
        <TrashIcon className="h-6 w-6 text-white" />
      </button>
    </div>
  );
};

export default TodoItem;
