import React from 'react'
import GoalTile from './GoalTile'
import { Link } from 'react-router'
var helpers = require("../app/utils/helpers");
/* This component will:
	*Take studentName & schoolName
	*Make ajax request
	*Retrieve list of goals for target student
	*Render goalTile for each goal ..
	*...passing in an array of objectives as the parameter
*/

export default React.createClass({

  getInitialState: function() {
    return { 
      school_name: "",
      student_id: "",
      student_name: "",	
      results: []
    };
  },

  componentWillMount: function(){
  	//get the students at the school that has been selected by the user
    var schoolName = this.props.params.schoolName;
    var studentId =  this.props.params.studentId;
    var studentName = this.props.params.studentName;

    this.setState({school_name: schoolName});
    this.setState({student_id: studentId});
    this.setState({student_name: studentName});

    console.log(studentId);

    helpers.getStudent(studentId).then(function(data) {
    	console.log("after helpers.getStudent");
    	console.log(data.data);
        if (data.data !== this.state.results) {
          this.setState({ results: data.data}); 
          console.log("results in Goal Tile");
          console.log(this.state.results);
      	}
      }.bind(this));
  },




	render() {
		return (
		  <div>
			
				<h1 >{this.state.student_name}</h1>

						<button id="addGoal"><Link to="/:schoolName/:studentId/manageGoal">+goal</Link></button>

		    {/*  GoalTile child for list of students to be clicked on then taken to the add-goal page to edit that goal.  Alternatively, user can click on the objective of the goal to display tasks of the objectives.  
		    	**passing any stored goals and their objs and tasks to these tiles..  */}


						<GoalTile student={this.state.results}/>

		  	</div>	
		)
	}
})