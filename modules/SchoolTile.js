import React from 'react'
import { Link } from 'react-router'
import NavLink from './NavLink'

/*This child of SchoolContainer will:
	*Be representational ONLY (no ajax)
	*Receive name as the parameter
	*Each tile will be linked (as written below)
*/

/*BIG NOTE:
	**ALL LINK TOS WILL BE MODIFIED TO INCLUDE PROPER IDs AND NAMES.
	The current state of link tos below are for reference to where these parameters will go.*/



export default React.createClass({
	componentWillMount: function(){
    	console.log("mounting SchoolTile component");
    	console.log(this.props.results);
	},

	render() {
		return (
			<div className="row" id="listOfSchools">
			  <div className="col-sm-4"></div>
			  <div className="col-sm-4">

				  {/*Schools to be listed here (under search bar)*/}
				  <div id="schoolList">
		 			  <ul>
		 			  	{this.props.results.map(function(search,i){

		 			  	 	return (
		 			  	 		<div key={i}>	  		
		 			  	 			<Link to={"/schools/" + search.name}><li className="school">{search.name}</li></Link>
		 			  	 		</div>
		 			  		);
		 			  	})}
		 			  </ul>
	 			  </div>
	 			  
 			  </div>
 			  <div className="col-sm-4"></div>
 			  	
			</div>
		);
	}
});