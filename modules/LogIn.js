import React from 'react'
import { Link } from 'react-router'

export default React.createClass({

getInitialState: function() {
    return { 
      username: "",
      password: ""

    };
  },

  handleChange: function(event){
    var newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  },

    handleSubmit: function(event) {
    // prevent the HTML from trying to submit a form if the user hits "Enter" instead of
    // clicking the button
    event.preventDefault();
    //do the login thing. 
  },

	render() {
		return (
			<div>
				{/*Login form*/}
				<form id="loginForm">

              		<div className="form-group">

              			<h1> PEAK Login </h1>

              			<div className="row">
	              			<div className="col-md-3">

				                <input
				                  type="text"
				                  value={this.state.username}
				                  onChange={this.handleChange}
				                  className="form-control text-left"
				                  id="username"
				                  placeholder="username"
				                  required
				                />
			                </div>
		                </div>
		                <br />
              			<div className="row">
	              			<div className="col-md-3">
			                    <input
			                      value={this.state.password}
			                      onChange={this.handleChange}
			                      type="text"
			                      className="form-control text-left"
			                      id="password"
			                      placeholder="password"
			                      required
			                    />
			                </div>
		                </div>
              			<br />

						<Link to="/schools"><button id="login">Login</button></Link>
					</div>
				</form>

			</div>
		)
	}
})


