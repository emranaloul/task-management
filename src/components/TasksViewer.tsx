const TasksViewer = () => {
  return (
    <div className='main-content'>
      <div className='task-list'>
        <div className='task'>
          <h3>Task as example 01</h3>
          <div className='tags'>
            <span>Category 01</span>
            <span>Category 02</span>
            <span>Category 03</span>
          </div>
          <div className='actions'>
            <span className='status completed'>Completed</span>
            <button className='edit'>✏️</button>
            <button className='delete'>🗑️</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TasksViewer;
