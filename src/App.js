 
import React from 'react';

import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from "react-router-dom";

import Routes from './routes/routes';

import fire from '../util/fire';

import GraphQL from "../util/graphQL";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            auth: false,
            user_email:'',
            points: 0,
            users:[],
            register:false
        }
        this.handleSignUp = this.handleSignUp.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.getUsers = this.getUsers.bind(this);
        this.getUser = this.getUser.bind(this);
    }
    getUser(){

        const {user_email} = this.state;
        console.log(' I getUser', user_email);
        GraphQL.getUser(user_email).then(user_ => {
            console.log('one_user2', user_.data.getUser.points);
            const points = user_.data.getUser.points || 0;
            this.setState(
                {points: points},
                localStorage.setItem("points", JSON.stringify(points))
            );
        });
    }

    getUsers(){
        console.log(' I getUsers');
        GraphQL.users().then(users_ => {
            console.log('result_users', users_.data.users);
            const users = users_.data.users || [];
            this.setState(
                {users: users},
                localStorage.setItem("users", JSON.stringify(users))
            );
        });
    }
    

    login(email,password){
        let user_email = '';
        fire.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed inGraphQL
            const user_email = userCredential.user.email;
            console.log('userCredential', user_email);
            if (user_email !== ''){
                this.setState(
                    {auth: true, user_email: user_email},
                    () => {
                        localStorage.setItem('loggedIn', 'true');
                        localStorage.setItem('user_email', JSON.stringify(user_email));
                        fire.auth().currentUser.getIdToken(true).then(function(idToken) {
                            localStorage.setItem('token', idToken);
                            console.log( 'token type', typeof idToken);
                        }).catch(function(error) {
                            // Handle error
                            console.log('did not set currentuser ', error);
                        });
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
        if (localStorage.getItem("user_email") != null) {
            let user_email = localStorage.getItem("user_email");
            this.setState({ user_email: JSON.parse(user_email) });
        }
        if (localStorage.getItem("points") != null) {
            let points = localStorage.getItem("points");
            this.setState({ points: JSON.parse(points) });
        }
        if (localStorage.getItem("users") != null) {
            let users= localStorage.getItem("users");
            console.log('__users: ', users);
            if(users.length > 0){this.setState({ users: JSON.parse(users) })}
        }
        //console.log("AuthbyLocal",this.state.auth);
    }
    
    render() {
    
        //console.log('isUserLoggedIn',localStorage.getItem('loggedIn'));
        console.log("Did I mount routes APPS");
        
        return (
            <Routes 
                auth={this.state.auth}
                user_email={this.state.user_email}
                points={this.state.points}
                users={this.state.users}
                register={this.state.register} 
                login={this.login}  
                logout={this.logout} 
                handleSignUp = {this.handleSignUp}
                getUsers = {this.getUsers}
                getUser = {this.getUser}
            />
        )
    }
    
}
export default App;
