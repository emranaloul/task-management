import { FC } from 'react';
import Button from '../Button/Button';
import './TaskManagementForm.css';
type PropTypes = {
  title: string;
  onCancelClick: () => void;
  onSaveClick: () => void;
};

const TaskManagementForm: FC<PropTypes> = ({
  title,
  onCancelClick,
  onSaveClick,
}) => {
  return (
    <div className='task-form'>
      <h3 className='form-title'>{title}</h3>
      <div className='form-body'>
        <input type='text' />
        <textarea name='' id=''></textarea>
      </div>
      <div className='task-form-footer'>
        <Button variant='outlined' onClick={onCancelClick}>
          cancel
        </Button>
        <Button variant='solid' onClick={onSaveClick}>
          save changes
        </Button>
      </div>
    </div>
  );
};

export default TaskManagementForm;
