import React from 'react';

import {  Redirect } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        username: '',
        password: '',
        redirectToReferrer: false
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
        this.setState({ 'redirectToReferrer': true}, () => {
            console.log('redirectToReferrer :', this.state.redirectToReferrer);
            this.props.login(this.state.username,this.state.password);
        });
        
    };
  
    

  render() {
      
     let { from } = this.props.location.state || { from: { pathname: "/" } };
    
    
    console.log('from1', from );
    let { redirectToReferrer } = this.state;
    console.log('rprops ', this.props);
    
    console.log('redirectToReferrer', redirectToReferrer );
    if (redirectToReferrer) return <Redirect to={from} />;  
    
    
    console.log('from: ',from);
    
    console.log('this.state.username: ',this.state.username);
    console.log('this.state.password: ',this.state.password);
      
    return (
      <div className="col-md-12">
        <div className="row section1">
            <img className="parallax-image1" src="/assets/images/wandlogin.png" />
            <form id="signin-form" className="text-center col-xl-12">
            <div className="col-xl-5 col-lg-8 col-md-12 offset-lg-2 center sign-form">
                <div className="col-xl-10 col-lg-11 col-md-12 center">
                <h1 className="sign-title">Sign In With Wand</h1>
                <div className="form-group">
                    <button className="social-sign facebook-sign">
                    <img src="https://wandusa.com/wand_app2/assets/images/facebook.svg" />
                    Sign Up with Facebook
                    </button>
                </div>
                <h3 style={{ color: "#3F3939", fontWeight: "bold" }}>OR</h3>
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
                <div className="form-group mt-4 mb-2">Forgot your Password?</div>
                <div className="col-md-12 mt-3">
                    <div className="form-group seperate-bar" />
                </div>
                <div className="form-group">
                    <h4>Don't have a Wand account?</h4>
                    <h4>
                    <a href="/signup" className="underlined sign-link">
                        Sign Up
                    </a>
                    ↗
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

export default Login; 
