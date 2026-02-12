import { useQuery } from '@tanstack/react-query';

import { Goal, TaskList, TaskModalFooter, TaskModalLayout } from '../../timer/components/TaskModal';
import { TaskModalProps } from '../../timer/timer.types';
import { dashboardQueries } from '../dashboard.queries';

interface TaskViewModalProps extends TaskModalProps {
  studyLogId: string;
}

const TaskViewModal = ({ onClose, studyLogId }: TaskViewModalProps) => {
  const { data: studyLogData } = useQuery({
    ...dashboardQueries.studyLogDetail(studyLogId || ''),
    enabled: !!studyLogId,
  });

  const { todayGoal, tasks, review } = studyLogData?.data || {};

  return (
    <TaskModalLayout>
      <Goal mode="view">{todayGoal}</Goal>
      <TaskList tasks={tasks || []} mode="view" />
      <div className="flex flex-col gap-2">
        <span className="label-m text-text-g600"></span>
        <p className="title-s text-text-g800">{review}</p>
      </div>
      <TaskModalFooter onCancel={onClose} cancelText="닫기" />
    </TaskModalLayout>
  );
};

export default TaskViewModal;
