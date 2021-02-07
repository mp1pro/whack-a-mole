import React from 'react';

import {  Redirect, withRouter, Link } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        username: '',
        password: '',
        redirectToReferrer: true
    };
    console.log('this.props',props);
    this.login = this.login.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handlePassChange = this.handlePassChange.bind(this);
  }

  handleUserChange(event) {
    this.setState({username: event.target.value});
  }
  
  handlePassChange(event) {
    this.setState({password: event.target.value});
  }
  
  
    login (event) {
        console.log('this', this.props);
        //this.setState({ redirectToReferrer: true });
        this.setState({ redirectToReferrer: true}, () => {
            console.log('redirectToReferrer :', this.state.redirectToReferrer);
            this.props.login(this.state.username,this.state.password);
        });
        
    };
  
    componentDidMount() {
        console.log('true', localStorage);
        if(localStorage.getItem('loggedIn') === 'true' ){
            console.log('true', 'its true');
            this.setState({ redirectToReferrer: true });
        }
    }

  render() {
      
     let  from  = this.props.location.state.from.pathname ||  "/"  ;
     let {auth} = this.props;
    
    
    console.log('from1', from );
    let { redirectToReferrer } = this.state;
    console.log('rprops ', this.props);
    
    console.log('redirectToReferrer1', redirectToReferrer );

          if (auth === true) return <Redirect to={from} />;


    
    
    console.log('from: ',from);
/*    
    console.log('this.state.username: ',this.state.username);
    console.log('this.state.password: ',this.state.password);
      */
    return (
      <div className="col-md-12">
        <div className="row section1">
            <form id="signin-form" className="text-center col-xl-12" onSubmit={e => e.preventDefault()}>
            <div className="col-xl-5 col-lg-8 col-md-12 offset-lg-2 center sign-form">
                <div className="col-xl-10 col-lg-11 col-md-12 center">
                <div className="form-group">
                    <input
                    onChange={this.handleUserChange} 
                    type="email"
                    name="Eamil"
                    className="form-control"
                    placeholder="Your email address"
                    required
                    />
                </div>
                <div className="form-group">
                    <input
                    onChange={this.handlePassChange} 
                    type="password"
                    name="Password"
                    className="form-control"
                    placeholder="Password"
                    required
                    />
                </div>
                <div className="form-group mt-5">
                    <button className="sign-button" onClick={this.login}>Sign In</button>
                </div>
                
                <div className="col-md-12 mt-3">
                    <div className="form-group seperate-bar" />
                </div>
                <div className="form-group">
                    <h4>Don't have a Game account?</h4>
                    <h4>
                   <Link className="menu" to={{pathname: '/signup'}}>
                        Sign Up
                    </Link>
                    
                    </h4>
                </div>
                </div>
            </div>
            </form>
        </div>
    </div>
    );
  } 
} 

export default withRouter(Login);
