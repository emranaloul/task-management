import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import TasksViewer from './components/TasksViewer';

function App() {
  return (
    <div className='container'>
      <Header />
      <Sidebar />
      <TasksViewer />
    </div>
  );
}

export default App;
