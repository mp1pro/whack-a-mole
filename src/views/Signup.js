import React, { Component} from "react";
import { BrowserRouter as Router, Link, Switch, Route, Redirect, useHistory } from 'react-router-dom';

class Signup extends Component{
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState(
            { [name]: value },
            () => console.log('state ',{...this.state})
        );
    }

    handleSubmit (event){
        this.props.handleSignUp({...this.state});
    }

    render(){
        const {register} = this.props;
        console.log('props_sign ',this.props);
        console.log('this_sign ',this);
        if (register) return <Redirect to={{
            pathname: "/login",
        }}/>;

        return(
            <div>
                <form className="form-con" onSubmit={e => e.preventDefault()}>
                    <p className="lead">
                        <strong>Signup to Start Playing</strong>.
                    </p>
                    <br/>
                    
                    <label className="iam">Email</label>
                    <input
                        onChange={this.handleChange}
                        type="email"
                        name="email"
                        className="input"
                        placeholder="Your email address"
                        required
                    />
                    <label className="iam">Password</label>
                    <input
                        onChange={this.handleChange}
                        type="password"
                        name="password"
                        className="input"
                        placeholder="Your Password"
                        required
                    />

                    <button className="button" onClick={this.handleSubmit}>
                        SIGN UP
                    </button>
                </form>
            </div>
        );
    }
}

export default Signup;
