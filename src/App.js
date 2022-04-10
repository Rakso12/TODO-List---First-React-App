import Navbar from './Navbar';
import TaskComponent from './TasksComponent';
import {  BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignIn from './SignIn';


function App() {
  
  var isShow = false;

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <TaskComponent/>
              
            </Route>
            
            <Route path="/signin">
              <SignIn></SignIn>
            </Route>
          </Switch>          
        </div>
        
      </div>
      
        
    </Router>
    
  );
}

export default App;
