import { Children, FC, useState } from 'react';
import { ITask, StatusType } from '../models';
import Chip from './common/Chip/Chip';
import Dialog from './common/Dialog/Dialog';
import TaskManagementForm from './common/TaskManagementForm/TaskManagementForm';
import DeleteTaskForm from './DeleteTaskForm/DeleteTaskForm';
import { StatuesArray } from '../constants';
import Spinner from './common/Spinner/Spinner';
import { useDebouncedPromise } from '../hooks/useDebouncedAction';

type PropTypes = {
  tasks: ITask[];
  updateTask: (task: ITask) => void;
  deleteTask: (id: string) => void;
  updateTaskStatus: (id: string, status: StatusType) => void;
};

const TasksViewer: FC<PropTypes> = ({
  tasks,
  updateTask,
  deleteTask,
  updateTaskStatus,
}) => {
  const [activeItem, setActiveItem] = useState<ITask | undefined>(undefined);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const debouncedStatusUpdate = useDebouncedPromise(updateTaskStatus);

  const onCloseEditDialog = () => {
    setActiveItem(undefined);
    setEditDialogOpen(false);
  };
  const onCloseDeleteDialog = () => {
    setActiveItem(undefined);
    setDeleteDialogOpen(false);
  };

  const updateStatusHandler = async (id: string, status: StatusType) => {
    setLoading(true);
    await debouncedStatusUpdate(id, status);
    setLoading(false);
  };

  return (
    <div className='main-content'>
      <Spinner active={loading} />
      <div className='task-list'>
        {Children.toArray(
          tasks?.map((task) => (
            <div className='task' key={task.id}>
              <div className='info-container'>
                <h3>
                  {task.name}{' '}
                  {task.description && (
                    <p className='description-tooltip'>{task.description}</p>
                  )}
                </h3>
                <div className='tags'>
                  {Children.toArray(
                    task?.categories.map((category) => <Chip>{category}</Chip>)
                  )}
                </div>
              </div>
              <div className='actions'>
                <select
                  className='status-select'
                  name='status'
                  id='status'
                  defaultValue={task.status}
                  aria-label={task.status}
                  onChange={(e) =>
                    updateStatusHandler(task.id, e.target.value as StatusType)
                  }
                >
                  {Children.toArray(
                    StatuesArray.map((status) => <option> {status}</option>)
                  )}
                </select>
                <button
                  className='edit'
                  onClick={() => {
                    setEditDialogOpen(true);
                    setActiveItem(task);
                  }}
                >
                  ✏️
                </button>
                <button
                  className='delete'
                  onClick={() => {
                    setActiveItem(task);
                    setDeleteDialogOpen(true);
                  }}
                >
                  🗑️
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <Dialog isOpen={editDialogOpen} onClose={onCloseEditDialog}>
        <TaskManagementForm
          title='Edit Task'
          onSaveClick={updateTask}
          onCancelClick={onCloseEditDialog}
          task={activeItem}
        />
      </Dialog>
      <Dialog isOpen={deleteDialogOpen} onClose={onCloseDeleteDialog}>
        <DeleteTaskForm
          task={activeItem!}
          onDeleteClick={deleteTask}
          onCancelClick={onCloseDeleteDialog}
        />
      </Dialog>
    </div>
  );
};

export default TasksViewer;
