 
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
        this.logout = this.logout.bind(this);
    }
    

    login(email,password){
        let user = '';
        fire.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            console.log('user=log: ', user);
            const user = userCredential.user;
            if (user !== ''){
                this.setState(
                    {auth: true, user: user},
                    () => {
                        localStorage.setItem('loggedIn', 'true');
                        localStorage.setItem('user', JSON.stringify(user));
                    }
                );
            }
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    }
    
    handleSignUp({...rest}){
        let user = '';
        const {email,password} = {...rest};
        fire.auth().createUserWithEmailAndPassword(email,password)
        .then((userCredential) => {
            
            const user = userCredential.user;
            console.log('user : ', user);
            
            if(user !== ''){
                this.setState({register: true});
            }

            
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log('error message: ', errorMessage + ' : ' +errorCode );
        });
    }
    logout (){
        fire.auth().signOut().then(() => {
            // Sign-out successful.
            this.setState({ auth: false });
            localStorage.clear();
            console.log("Bye",this.state.auth);
        }).catch((error) => {
            // An error happened.
        });
    };
    
    componentDidMount() {


        if(localStorage.getItem('loggedIn') === 'true' ){
            console.log('authmount: ', loggedIn);
            const loggedIn = localStorage.getItem("loggedIn");
            this.setState({ auth: JSON.parse(loggedIn) });

        }
        if (localStorage.getItem("user") != null) {
            let userArray = localStorage.getItem("user");
            if(userArray.length > 0){this.setState({ user: JSON.parse(userArray) })}
             console.log('user local: ', JSON.parse(userArray));
            console.log('user2 local: ', userArray);
        }
        //console.log("AuthbyLocal",this.state.auth);
    }
    
    render() {
    
        //console.log('isUserLoggedIn',localStorage.getItem('loggedIn'));
        console.log("Did I mount routes APPS");
        
        return (
            <Routes 
                auth={this.state.auth} 
                register={this.state.register} 
                login={this.login}  
                logout={this.logout} 
                handleSignUp = {this.handleSignUp} 
            />
        )
    }
    
}
export default App;
