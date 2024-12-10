import { FC, useState } from 'react';
import deleteIcon from '../../assets/Group.png';
import deleteSmallIcon from '../../assets/Group-42889.png';
import { ITask } from '../../models';
import Button from '../common/Button/Button';
import Spinner from '../common/Spinner/Spinner';
import { useDebouncedPromise } from '../../hooks/useDebouncedAction';

type PropTypes = {
  task: ITask;
  onDeleteClick: (id: string) => void;
  onCancelClick: () => void;
};
const DeleteTaskForm: FC<PropTypes> = ({
  task,
  onCancelClick,
  onDeleteClick,
}) => {
  const [loading, setLoading] = useState(false);
  const debouncedDelete = useDebouncedPromise(onDeleteClick);

  const onDeleteHandler = async () => {
    setLoading(true);
    await debouncedDelete(task.id);
    setLoading(false);
    onCancelClick();
  };
  return (
    <div className='delete-form'>
      <Spinner active={loading} />
      <img className='delete-image' src={deleteIcon} alt='delete-icon' />
      <h2>Delete Task!</h2>
      <p className='delete-text'>
        Are you sure you want to delete
        <br />
        <strong>{task.name}?</strong>
      </p>
      <div className='delete-form-footer'>
        <Button color='secondary' onClick={onCancelClick}>
          Cancel
        </Button>
        <Button
          color='danger'
          iconSrc={deleteSmallIcon}
          onClick={onDeleteHandler}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default DeleteTaskForm;
