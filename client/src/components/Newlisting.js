//Newlising.js
import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";//this is for routing




export default class Newlising extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
      data: {
        city: "",
        age: "",
        PhoneNumber: "",
      },
      error: {
        city: "",
        age: "",
        PhoneNumber: "",
      },
      success: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getCurrentUser = this.getCurrentUser.bind(this);
  }

  getCurrentUser(){
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


  handleChange(element) {
    var formData = this.state.data;
    formData[element.target.name] = element.target.value;
    this.setState({
      data: formData
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);
    let _this = this;
    axios
      .post("https://thawing-retreat-46731.herokuapp.com/api/postArticle", this.state.data)
      .then(res => {
        console.log("res", res);
        if (res.data.errors) {
          let mainErrors = res.data.errors;
          let err_msg = {
            city: mainErrors.city ? mainErrors.city.msg : "",
            age: mainErrors.age ? mainErrors.age.msg : "",
            PhoneNumber: mainErrors.PhoneNumber ? mainErrors.PhoneNumber.msg : "",
          };
          _this.setState({
            error: err_msg,
            success: ""
          });
        } else {
          _this.setState({
           
            data: {
              city: "",
              age: "",
              PhoneNumber: "",
            },
            error: {
             
              city: "",
              age: "",
              PhoneNumber: "",
            },
            success: "Thank you for Addin Your Contact"
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <Link className='btn btn-success' to={'/'}>Home Page</Link>
    
        <br />
        <h1>Tell us a few more things</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputname">Your City</label>
            <input type="text" 
             name="city" 
             value={this.state.data.city} 
             onChange={this.handleChange} 
             className="form-control" 
             id="exampleInputcity" 
             placeholder="your city"
            />
            <h3 className="text-danger">{this.state.error.city}</h3>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputname">Your Age</label>
            <input type="text"
              name="age"
              value={this.state.data.age}
              onChange={this.handleChange}
              className="form-control"
              id="exampleInputname"
              placeholder="Your age"
            />
            <h3 className="text-danger">{this.state.error.age}</h3>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputname">Phone Number</label>
            <input type="text"
              name="PhoneNumber"
              value={this.state.data.PhoneNumber}
              onChange={this.handleChange}
              className="form-control"
              id="exampleInputname"
              placeholder="Your Phone Number"
            />
            <h3 className="text-danger">{this.state.error.PhoneNumber}</h3>
           </div>  
       

          <button type="submit" className="btn btn-primary"> Add me to the phonbook   
          </button>
        </form>
        {this.state.success === "" ? (
          <p />
        ) : (
          <p className="text-success">{this.state.success}</p>
        )}
        <br />
        <br />
      </div>
    );
  }
}