//Login.js
import React, { Component } from "react";
import axios from "axios";
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      err: null
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  submitHandler(e) {
    e.preventDefault();
    axios.post("https://thawing-retreat-46731.herokuapp.com/api/login", this.state).then(res => {
      console.log(res);
      if (res.data.error) {
        return this.setState({ err: res.data.message });
      }
      return this.props.history.push("/Phonebook");
    });
  }

  changeHandler(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    var changeHandler = this.changeHandler;
    return (
      <div className="loginform">
        <h1>Login</h1>
        {this.state.err && <h3>{this.state.err}</h3>}
        <form onSubmit={this.submitHandler}>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              value={this.state.email}
              name="email"
              onChange={changeHandler}
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              onChange={changeHandler}
              value={this.state.password}
              name="password"
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Log In
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
