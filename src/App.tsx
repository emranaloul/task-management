import { useMemo, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import TasksViewer from './components/TasksViewer';
import { ITask, StatusType } from './models';
import { useDebouncedPromise } from './hooks/useDebouncedAction';
import Spinner from './components/common/Spinner/Spinner';
import { categories, StatuesArray } from './constants';

function App() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState(false);
  const createTaskHandler = (task: ITask) => {
    setTasks([...tasks, task]);
  };
  const [filter, setFilter] = useState<{ [key: string]: string }>({});
  const debouncedSetFilter = useDebouncedPromise(setFilter);
  const filteredTask = useMemo(() => {
    let data = tasks;
    Object.entries(filter).forEach(([key, value]) => {
      data = data.filter((item) => {
        const keyValue = item[key as keyof ITask];
        if (value) {
          if (Array.isArray(keyValue)) {
            return keyValue.includes(value);
          } else {
            return keyValue === value;
          }
        } else return true;
      });
    });
    return data;
  }, [filter, tasks]);
  const updateTask = (task: ITask) => {
    setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
  };
  const deleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const updateTaskStatus = (id: string, status: StatusType) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, status } : t)));
  };

  const updateFilter = async (key: keyof ITask, value: string) => {
    setLoading(true);
    await debouncedSetFilter((prev) => ({ ...prev, [key]: value }));
    setLoading(false);
  };
  return (
    <div className='container'>
      <Spinner active={loading} />
      <Header createTaskHandler={createTaskHandler} />
      <Sidebar
        filterOptions={[
          { key: 'status', title: 'Completion Status', options: StatuesArray },
          { key: 'categories', title: 'Categories', options: categories },
        ]}
        updateFilter={updateFilter}
      />
      <TasksViewer
        tasks={filteredTask}
        updateTask={updateTask}
        deleteTask={deleteTask}
        updateTaskStatus={updateTaskStatus}
      />
    </div>
  );
}

export default App;
