import { FC, useState } from 'react';
import Add from '../assets/Add.png';
import Dialog from './common/Dialog/Dialog';
import TaskManagementForm from './common/TaskManagementForm/TaskManagementForm';
import { ITask } from '../models';

type PropTypes = {
  createTaskHandler: (task: ITask) => void;
};

const Header: FC<PropTypes> = ({ createTaskHandler }) => {
  const [open, setOpen] = useState(false);
  return (
    <header>
      <h1>Task Management</h1>
      <button className='new-task' onClick={() => setOpen(true)}>
        <img src={Add} alt='add' />
        <span>New Task</span>
      </button>
      <Dialog isOpen={open} onClose={() => setOpen(false)}>
        <TaskManagementForm
          title='create new task'
          onCancelClick={() => setOpen(false)}
          onSaveClick={createTaskHandler}
        />
      </Dialog>
    </header>
  );
};

export default Header;
