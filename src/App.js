 
import React from 'react';

import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from "react-router-dom";

import Routes from './routes/routes';

import fire from '../util/fire';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            auth: false,
            user:'',
            register:false
        }
        this.handleSignUp = this.handleSignUp.bind(this);
        this.login = this.login.bind(this);
    }
    

    login({email,password}){
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    
        /*Auth.auth({...rest}).then(searchResults => {
            const userData = searchResults.data[0];
            const success = JSON.parse(searchResults.success);

            if (success){
                console.log('AUTH: ',  typeof searchResults.success,' + ', success);
                this.setState(
                    {auth: success, user: userData},
                    () => {
                        localStorage.setItem('loggedIn', 'true');
                        localStorage.setItem('user', JSON.stringify(userData));
                    }
                );
            }
            else
            {
                this.setState(
                    {auth: success}
                )
            }
        });*/
    }
    
    handleSignUp({...rest}){
        const {email,password} = {...rest};
        fire.auth().createUserWithEmailAndPassword(email,password)
        .then((userCredential) => {
            
            const user = userCredential.user;
            console.log('user : ', user);
            this.setState({register: true});

            
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log('error message: ', errorMessage + ' : ' +errorCode );
        });
    }
    
    componentDidMount() {}
    
    render() {
    
        //console.log('isUserLoggedIn',localStorage.getItem('loggedIn'));
        console.log("Did I mount routes APPS");
        
        return (
            <Routes auth={this.state.auth} register={this.state.register} login={this.login}  handleSignUp = {this.handleSignUp} />
        )
    }
    
}
export default App;
