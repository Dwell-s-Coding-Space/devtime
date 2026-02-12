import { ReactNode } from 'react';

import Portal from '@/src/shared/components/modal/Portal';

const TaskModalLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Portal>
      <div
        className="bg-dim-b50 fixed top-0 left-0 z-50 flex h-screen w-full items-center justify-center overflow-hidden"
        style={{
          paddingBlock: `clamp(30px, calc(126 / 1080 * 100vh), 126px)`,
        }}
      >
        <div className="bg-background-white mx-auto flex h-full w-full max-w-[640px] flex-col gap-9 rounded-[12px] p-9 pt-12">
          {children}
        </div>
      </div>
    </Portal>
  );
};

export default TaskModalLayout;
