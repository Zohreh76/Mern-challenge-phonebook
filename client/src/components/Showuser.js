import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


export default class Showuser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
    axios
      .get(
        "https://thawing-retreat-46731.herokuapp.com/api/userposts/" + this.props.match.params.userid
      )
      .then(data => this.setState({ data: data.data }));
  }
  render() {
    var data = this.state.data;
    return this.state.data ? (
      <div>
        <ul>
          <p>{data.user.name} phone book detail</p>
          {data.posts.map(post => {
            return (
              <ul>
                <p>city:{post.city}</p>
                <p>Phone Number:{post.PhoneNumber}</p>
             <hr />
              </ul>
            );
          })}
        </ul>
        <Link className='btn nav-link btn-success' to='/phonebook'>Back to all contact</Link>
      </div>
    ) : (
      <p>Loading</p>
    );
  }
}
