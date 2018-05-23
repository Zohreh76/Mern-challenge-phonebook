import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Result(props) {
  return props.posts.map(post => {
    return (
      <ul className="users" key={post._id}>
        <div className="card-body">
          <h2 className="card-title">
           {" "}
            <Link to={"/phonebook/" + post.user._id}>
              {" "}
              {post.user.name}{" "}
            </Link>
          </h2>
          <h2 className="card-title">City: {post.city}</h2>
          {/* <h4 className="card-text">Add on: {post.createdat}</h4> */}
          <Link className="btn btn-primary" to={"/phonebook/" + post.user._id }>
            Contact Detail
          </Link>
          <hr />
        </div>
      </ul>
    );
  });
}

class Allposts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: null
    };
  }
  componentDidMount() {
    axios
      .get("https://thawing-retreat-46731.herokuapp.com/api/Allposts/")
      .then(res => this.setState({ posts: res.data }));
  }

  render() {
    return <div>{this.state.posts && <Result posts={this.state.posts} />}</div>;
  }
}

export default Allposts;

