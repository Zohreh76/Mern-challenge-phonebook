//Main.js
import React, { Component } from "react";
import axios from "axios";
import Allposts from "./Allposts";

import { Link } from 'react-router-dom';//this is for routing

axios.defaults.withCredentials = true;// this is getting credentials

export default class Home extends Component {
  constructor(props){
    super(props);
    this.state={
        user:null,
        error:'Please Login'
    }
          

    axios.get('https://thawing-retreat-46731.herokuapp.com/api/currentuser')
    .then(function(result){
        console.log(result);
        this.setState({
            user: result.data,
            error: ''
        })
    }.bind(this))
    .catch(error => console.log(error))   
    
}

 render() {

   return (
     <div>
       <div className="header">
         <h1>PhoneBOOK: Find Anyone!</h1>

         {!this.state.user &&
           <p>In order to add contact you need to login first</p>}

         {!this.state.user &&
           <Link className='btn nav-link btn-success' to='/article/join'>
             Log in/Register
           </Link>}
       </div>

      <div id="button">
       {this.state.user &&
         <Link className='btn btn-warning' to='/Logout'>
           Log out
        </Link>}

        {this.state.user &&
         <Link className="btn btn-info" to="/phone/add">
         Add your Detail
        </Link>}
        
        </div>
       {/* {this.state.user && <h1> Author: {this.state.user.name}</h1>} */}
     
     
     <Allposts />
     </div>
   );
  }
}