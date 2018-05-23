//Logout.js
import React, { Component } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';//this is for routing



export default class Logout extends Component {

    componentDidMount(){
        axios.get('https://thawing-retreat-46731.herokuapp.com/api/logout').then((res)=>null);
         // this.state = this.defaultState;
    }
    render() {
        return (
            <div>
                <p>You are logged out successfully...</p>
                    <Link className='btn nav-link btn-success' to='/'>
                       Back to login and register
                    </Link>
            </div>
        )
    }
}

