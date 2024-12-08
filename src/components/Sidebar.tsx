const Sidebar = () => {
  return (
    <div className='sidebar'>
      <h2>Filter</h2>
      <div>
        <h3>Completion Status</h3>
        <label>
          <input type='radio' name='status' defaultChecked /> All
        </label>
        <label>
          <input type='radio' name='status' /> Completed
        </label>
        <label>
          <input type='radio' name='status' /> Incomplete
        </label>
      </div>
      <div>
        <h3>Categories</h3>
        <label>
          <input type='radio' name='category' defaultChecked /> All
        </label>
        <label>
          <input type='radio' name='category' /> Category 01
        </label>
        <label>
          <input type='radio' name='category' /> Category 02
        </label>
        <label>
          <input type='radio' name='category' /> Category 03
        </label>
      </div>
    </div>
  );
};

export default Sidebar;
