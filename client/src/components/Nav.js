//NAV.js
import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
class Nav extends Component {
  render() {
    return (
      <div className="Navbtn">
        <ul className="nav justify-content-center">
         <br />
          <li className="nav-item">
     
            <Link className="btn nav-link btn-success" to="/Allposts">
              home
            </Link>
            <br />
            <Link
              className="nav-link btn-warning"
              to="/"
              onClick={() =>
                axios.get("https://thawing-retreat-46731.herokuapp.com/api/logout").then(res => null)}>
              Logout
            </Link>
           
          </li>
        </ul>
      </div>
    );
  }
}

export default Nav;
