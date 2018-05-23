//App.js
import React, { Component } from "react";
import "./index.css";
import Logreg from "./components/Logreg";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom"; //this is for routing
import Home from "./components/Home"; // Home = phone book
import Newlisting from "./components/Newlisting";
import Logout from "./components/Logout";
import Showuser from "./components/Showuser";
class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={Logreg} />
            <Route exact path="/Phonebook" component={Home} />    
            <Route path="/Phone/add" component={Newlisting} />
            <Route exact path="/Logout" component={Logout} />
            <Route path="/phonebook/:userid" component={Showuser} />
            <Route
              render={function() {
                return (
                  <p>
                    {" "}
                    Not Found
                    <br />
                    <Link className="btn nav-link btn-success" to="/">
                      Back to log and Reg
                    </Link>
                  </p>
                );
              }}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}
export default App;
