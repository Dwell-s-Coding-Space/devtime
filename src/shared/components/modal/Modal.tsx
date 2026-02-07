'use client';

import { useModalStore } from '@/src/shared/store/useModalStore';
import Button from '../button/Button';
import Portal from './Portal';

const Modal = () => {
  const isOpen = useModalStore(state => state.isOpen);
  const payload = useModalStore(state => state.payload);
  const onClose = useModalStore(state => state.onClose);
  const onConfirm = useModalStore(state => state.onConfirm);
  const onCancel = useModalStore(state => state.onCancel);

  const { title, description, buttons } = payload || {};

  if (!isOpen) return null;

  return (
    <Portal>
      <div
        onClick={onClose}
        className="bg-dim-b50 fixed top-0 left-0 z-50 flex h-screen w-full items-center justify-center overflow-hidden"
      >
        <div className="bg-background-white mx-auto flex w-full max-w-[328px] flex-col gap-6 rounded-[12px] p-6 shadow-[0_8px_8px_0_rgba(0,0,0,0.05)]">
          <div className="flex flex-col gap-2">
            <h2 className="title-s">{title}</h2>
            {description && <p className="body-m text-text-g600">{description}</p>}
          </div>
          <div className="flex items-center justify-end gap-4">
            {buttons?.map(({ variant, action, label, isFullWidth = false }) => (
              <Button
                key={label}
                variant={variant}
                onClick={action === 'cancel' ? onCancel : onConfirm}
                className={isFullWidth ? 'w-full' : ''}
              >
                {label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default Modal;
