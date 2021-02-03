 
import React from 'react';


import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from "react-router-dom";

//import Routes from './routes/routes';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            auth: false,
        }
    }
    
    render() {
    
        //console.log('isUserLoggedIn',localStorage.getItem('loggedIn'));
        
        return (
            <div className="App">
                <h1> Hello, World! </h1>
            </div>
        )
    }
    
}
export default App;
