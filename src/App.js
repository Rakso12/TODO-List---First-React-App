import Navbar from './Navbar';
import TaskComponent from './TasksComponent';

function App() {
  
  return (
    <div className="App">
      <Navbar />
      <div className="content">
        <TaskComponent/>
      </div>
    </div>
  );
}

export default App;
