import { ComponentProps } from 'react';

import TextField from '@/src/shared/components/form/TextField';

interface AddTaskItemProps extends ComponentProps<'input'> {
  onClick: () => void;
}

const AddTaskItem = ({ onClick, value, onChange, ...inputProps }: AddTaskItemProps) => {
  return (
    <TextField
      label="할 일 목록"
      value={value}
      onChange={onChange}
      placeholder="할 일을 추가해 주세요."
      maxLength={30}
      {...inputProps}
      innerButton={
        <button
          disabled={!value}
          onClick={onClick}
          className="disabled:body-b disabled:text-text-disabled-400 body-b text-text-primary"
        >
          추가
        </button>
      }
    />
  );
};

export default AddTaskItem;
