import React from 'react'
import { Link } from 'react-router'
import TaskTile from './TaskTile'

/*This child of GoalContainer will:
	*Be representational ONLY (no ajax)
	*Receive an array of objectives
	*will store all objectives in the state and displays
*/

/*BIG NOTE:
	**ALL LINK TOS WILL BE MODIFIED TO INCLUDE PROPER IDs AND NAMES.
	The current state of link tos below are for reference to where these parameters will go.*/


export default React.createClass({
	render() {
		return (
			<div>

 			  	{this.props.student.map(function(stdnt,i){
 			  		return (
 			  			<div key={i}>
 			 
 			  			<ul >
 			  			{stdnt.goals.map(function(goals,j){
 			  				return (
 			  				 <div className="row">
 			  					<li key={j}>

 			  						<div className='col-sm-4' id="studentGoalCol">
 			  						 <div id="goalContainer">
	 			  						 <h2 id="goalTitle">{goals.goal.code}</h2> 
	 			  						 <h3 id="goalDesc">{goals.goal.description}</h3>
 			  						 </div>
 			  						</div>

 			  						
 			  						<ul>
 			  							{goals.student_objectives.map(function(s_obj,k){
 			  							return (
 			  								<li key={k}>

 			  								<div className='col-sm-4' id="studentObjCol">
 			  								  <div id="objContainer">
 			  									{/*Link to add a new task to an objective - each objective gets one of these links */}
 			  									<h3 id="studentObjective">{s_obj.objective.code } - {s_obj.objective.description}</h3>
 			  									<br/>

			 			  						{/*Link to add a new objective to a goal - each goal gets one of these links*/}
			 			  						<Link to={"/studentObjective/" + stdnt._id + "/" + stdnt.student_name + "/" + goals.goal._id} className="addObjective">Add Objective</Link>
			 			  					   </div>
			 			  					</div>

			 			  					<div className='col-sm-4' id="studentTaskCol">
			 			  					  <div id="taskContainer">
 			  									<Link to={"/studentTask/" + stdnt._id + "/" + stdnt.student_name + "/" + s_obj._id}>+task</Link>

 			  									<TaskTile tasks={s_obj.tasks}/>	
 			  								  </div>
 			  								</div>						
 			  								</li>
 			  								);
 			  							})}

 			  						</ul>

 			  					</li>
 			  				</div>
 			  				);
 			  			})}
 			  			</ul>

 			  			</div>

 			  		);
 			  	})}		

 			  	{/*return to schools page*/}
			    <div className="row">
			        <div className="col-sm-2">
			          <Link to={"/schools/" + this.props.school}><img id="backToSchool" src="/images/school.png"/></Link>
			        </div>
			    </div>

			</div>
		)
	}
})