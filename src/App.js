 
import React from 'react';


import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from "react-router-dom";

import Routes from './routes/routes';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            auth: false,
        }
    }
    
    componentDidMount() {}
    
    render() {
    
        //console.log('isUserLoggedIn',localStorage.getItem('loggedIn'));
        console.log("Did I mount routes APPS");
        
        return (
            <Routes auth={this.state.auth}  />
        )
    }
    
}
export default App;
