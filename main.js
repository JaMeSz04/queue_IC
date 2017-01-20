import React from 'react';
import ReactDOM from 'react-dom';
import QueueApplication from './QueueApplication.jsx';
import { Router, Route, Link, browserHistory } from 'react-router'
import AddQueueApplication from './AddQueueApplication.jsx';


class MainApp extends React.Component{
    render(){
        return(
            <QueueApplication isAdmin = {false}/>
        )
    }
}

class MainAppAdmin extends React.Component{
    render(){
        return(
            <QueueApplication isAdmin = {true}/>
        )
    }
}
ReactDOM.render(
<Router history={browserHistory}>
    <Route path="/" component={MainApp}/>
    <Route path="/89977474" component={MainAppAdmin}/>
    <Route path="/register" component={AddQueueApplication}/>
</Router>
  , document.getElementById('app'));

