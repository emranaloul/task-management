import { Children, FC } from 'react';
import { ITask } from '../models';

type PropTypes = {
  filterOptions: { key: keyof ITask; title: string; options: string[] }[];
  updateFilter: (key: keyof ITask, value: string) => void;
};
const Sidebar: FC<PropTypes> = ({ filterOptions, updateFilter }) => {
  return (
    <div className='sidebar'>
      <h2>Filter</h2>
      {Children.toArray(
        filterOptions.map((filter) => (
          <div>
            <h3>{filter.title}</h3>
            <label>
              <input
                type='radio'
                name={filter.key}
                defaultChecked
                onChange={() => updateFilter(filter.key, '')}
              />{' '}
              All
            </label>
            {Children.toArray(
              filter.options.map((option) => (
                <label>
                  <input
                    type='radio'
                    name={filter.key}
                    value={option}
                    onChange={(e) => updateFilter(filter.key, e.target.value)}
                  />{' '}
                  {option}
                </label>
              ))
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Sidebar;
