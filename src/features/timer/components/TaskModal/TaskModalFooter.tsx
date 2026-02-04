import Button from '@/src/shared/components/button/Button';

interface TaskModalFooterProps {
  cancelText?: string;
  confirmText?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
}

const TaskModalFooter = ({
  onConfirm,
  onCancel,
  confirmText = '확인',
  cancelText = '취소',
}: TaskModalFooterProps) => {
  return (
    <div className="flex items-center justify-end gap-4">
      {onCancel && (
        <Button variant="tertiary" onClick={onCancel}>
          {cancelText}
        </Button>
      )}
      {onConfirm && (
        <Button variant="secondary" onClick={onConfirm}>
          {confirmText}
        </Button>
      )}
    </div>
  );
};

export default TaskModalFooter;
