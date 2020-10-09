import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import MyEdit from './components/MyEdit';
import NewUser from './components/NewUser';

function App() {

  function doRedirect(){
    let loggedIn = localStorage.getItem("user");
    const myId = localStorage.getItem("myUserId");
    console.log('logged-in', loggedIn)
    console.log('logged-in2', myId)
    if(loggedIn){
        return <Redirect to='/home'/>
    }else{
        return <Redirect to='/'/>                        
    }
}
  return (
     <Router>
              <Switch>
              <Route exact path="/" component={Login}/>
              <Route path="/signup" component={Register}/>
              <Route path='/home' component={Home}/>
              <Route path='/myedit' component={MyEdit}/> 
              <Route path='/newuser' component={NewUser}/> 
               </Switch>
               {doRedirect()}
      </Router>
  );
}

export default App;
