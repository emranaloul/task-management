import { FC, useState } from 'react';
import Button from '../Button/Button';
import Select from '../Select/Select';
import { ITask } from '../../../models';
import Spinner from '../Spinner/Spinner';
import { useDebouncedPromise } from '../../../hooks/useDebouncedAction';
import { categories } from '../../../constants';
type PropTypes = {
  title: string;
  onCancelClick: () => void;
  onSaveClick: (task: ITask) => void;
  task?: ITask;
};

const TaskManagementForm: FC<PropTypes> = ({
  title,
  onCancelClick,
  onSaveClick,
  task: activeTask,
}) => {
  const [task, setTask] = useState<ITask>(
    activeTask ?? {
      name: '',
      description: '',
      categories: [],
      id: crypto.randomUUID(),
      status: 'incomplete',
    }
  );
  const debouncedCreate = useDebouncedPromise(onSaveClick);
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<{ categories?: string; name?: string }>(
    {}
  );

  const updateDataHandler = (key: keyof ITask, value: string | string[]) => {
    setTask((prev) => ({ ...prev, [key]: value }));
  };

  const saveHandler = async () => {
    setLoading(true);
    try {
      if (!task.name.trim() || task.categories.length === 0) {
        const _errors = { ...errors };
        if (!task.name.trim()) {
          _errors.name = 'Task name is required';
        }
        if (task.categories.length === 0) {
          _errors.categories = 'Select at least one category';
        }
        throw _errors;
      }
      await debouncedCreate(task);
      setTask({
        name: '',
        description: '',
        categories: [],
        id: crypto.randomUUID(),
        status: 'incomplete',
      });
      onCancelClick();
      setLoading(false);
    } catch (error: unknown) {
      setErrors(error as { [key: string]: string });
      setLoading(false);
    }
  };

  return (
    <div className='task-form'>
      <Spinner active={loading} />
      <h3 className='form-title'>{title}</h3>
      <div className='form-body'>
        <div>
          <label className='floating-label' htmlFor='task-name'>
            Task name*
          </label>
          <input
            type='text'
            id='task-name'
            name='task-name'
            value={task.name}
            onChange={(e) => updateDataHandler('name', e.target.value)}
          />
          <span className='error-message'>{errors.name}</span>
        </div>
        <div>
          <label className='floating-label' htmlFor='task-name'>
            Task description (optional)
          </label>
          <textarea
            value={task.description}
            rows={10}
            name='description'
            id='description'
            onChange={(e) => updateDataHandler('description', e.target.value)}
          ></textarea>
          <span className='error-message'></span>
        </div>
        <div>
          <Select
            options={categories}
            selectedItems={task.categories}
            onSelectedChange={(categories) =>
              updateDataHandler('categories', categories)
            }
            placeholder='select category'
            label='categories'
            errorMessage={errors['categories']}
          />
        </div>
      </div>
      <div className='task-form-footer'>
        <Button color='secondary' onClick={onCancelClick}>
          cancel
        </Button>
        <Button color='primary' onClick={saveHandler}>
          save changes
        </Button>
      </div>
    </div>
  );
};

export default TaskManagementForm;
