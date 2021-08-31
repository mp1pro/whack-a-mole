 
import React from 'react';

import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from "react-router-dom";

import Routes from './routes/routes';

import fire from '../util/fire';

import GraphQL from "../util/graphQL";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            auth: true,
            user_email:'',
            points: 0,
            users:[],
            register:false,
            play_points: 0,
            interval: 1000,
            ticker: 10,
            stop: false,
            width: 0,
            height: 0
        }
        this.handleSignUp = this.handleSignUp.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.getUsers = this.getUsers.bind(this);
        this.getUser = this.getUser.bind(this);
        this.set_Interval = this.set_Interval.bind(this);
        this.addPoints = this.addPoints.bind(this);
        this.tick = this.tick.bind(this);
        this.updateWindow = this.updateWindow.bind(this);
        this.resetGame = this.resetGame.bind(this);
    }
    
    updateWindow() {
        this.setState({ 
            width: window.innerWidth, 
            height: window.innerHeight 
        });
    }
    
    resetGame(){
        console.log('reset');
        this.setState(
            {
                ticker: 10
                ,
                stop: false
            }
        );
    }
    
    tick(){
        if (this.state.ticker > 0) {
            console.log('something');
            this.setState((prevState) => ({
                ticker: prevState.ticker-1
            }));
        } else {
            console.log('should stop');
            clearInterval(this.timer);
            clearInterval(this.intervalId);
            ///*
            this.setState((prevState) => ({
                stop: !prevState.stop
            }));
            //*/

            //window.location.replace("/end");
        }
    }
    addPoints(){
      this.setState((prevState) => ({
        play_points:prevState.play_points+1
      }));
    }
    
    set_Interval(inter){
        console.log('inter', inter);
        this.setState(
            {interval: inter},
            localStorage.setItem("interval", JSON.stringify(inter))
        );
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
        this.updateWindow();
        window.addEventListener('resize', this.updateWindow);

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
    
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindow);
    }
    
    render() {
    
        //console.log('isUserLoggedIn',localStorage.getItem('loggedIn'));
        console.log("aPPS",this.state.ticker,'stopper',this.state.stop);
        console.log('width',this.state.width,'height',this.state.height);
        
        return (
            <Routes 
                auth={this.state.auth}
                play_points={this.state.play_points}
                user_email={this.state.user_email}
                points={this.state.points}
                users={this.state.users}
                register={this.state.register}
                interval={this.state.interval}
                stop={this.state.stop}
                ticker={this.state.ticker}
                width={this.state.width}
                height={this.state.height}
                tick={this.tick}
                login={this.login}  
                logout={this.logout} 
                handleSignUp = {this.handleSignUp}
                getUsers = {this.getUsers}
                getUser = {this.getUser}
                set_Interval = {this.set_Interval}
                addPoints = {this.addPoints}
                resetGame = {this.resetGame}
            />
        )
    }
    
}
export default App;
