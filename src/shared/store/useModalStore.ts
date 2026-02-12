import { create } from 'zustand';

import type { ButtonVariant } from '@/src/shared/components/button/Button';

interface ModalButton {
  label: string;
  action: 'cancel' | 'confirm';
  variant: ButtonVariant;
  isFullWidth?: boolean;
}

interface ModalState {
  isOpen: boolean;
  payload: {
    title: string;
    description?: string;
    buttons: ModalButton[];
  } | null;
  resolver: ((value: boolean) => void) | null;

  onOpen: (payload: ModalState['payload']) => Promise<boolean>;
  onClose: () => void;
  onConfirm: () => void;
  onCancel: () => void;
}

const initialModalState = {
  isOpen: false,
  payload: null,
  resolver: null,
};

export const defaultDoubleButtons: ModalButton[] = [
  { label: '취소', action: 'cancel', variant: 'secondary' },
  { label: '확인', action: 'confirm', variant: 'primary' },
];

export const defaultSingleButton: ModalButton[] = [
  { label: '확인', action: 'confirm', variant: 'primary' },
];

export const useModalStore = create<ModalState>()(set => ({
  ...initialModalState,

  onOpen: payload => {
    return new Promise<boolean>(resolve => {
      set({
        isOpen: true,
        payload,
        resolver: resolve,
      });
    });
  },
  onClose: () => {
    set(state => {
      state.resolver?.(false);
      return initialModalState;
    });
  },
  onConfirm: () => {
    return set(state => {
      state.resolver?.(true);
      return initialModalState;
    });
  },
  onCancel: () => {
    set(state => {
      state.resolver?.(false);
      return initialModalState;
    });
  },
}));
