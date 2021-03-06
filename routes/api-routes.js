//this is the file for the express routes
var path=require("path");
var School = require("../models/School");
var Student = require("../models/Student");
var Goal = require("../models/Goal");
var Objective = require("../models/Objective");
var Student_Objective = require("../models/Student_Objective");
var Task = require("../models/Task");

module.exports = function(app) {

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});


app.get("/api/schoolnames", function(req, res) {
  School.find({})
    .sort([["name", 1]])
    .select('name _id')
    .exec(function(err, doc) {
      console.log(doc);
    if (err) {
      console.log(err);
    }
    else {
      res.send(doc);
    }
  });
});  

app.get("/api/goals", function(req, res) {
  Goal.find({})
    .sort([["code", 1]])
    .populate("objectives")
    .exec(function(err, doc) {
      console.log(doc);
    if (err) {
      console.log(err);
    }
    else {
      res.send(doc);
    }
  });
});  

app.get("/api/studentnames/:schoolname", function(req, res) {
  School.find({'name': req.params.schoolname})
    .populate("students")
    .exec(function(err, doc) {
      console.log(doc);
    if (err) {
      console.log(err);
    }
    else {
      res.send(doc);
    }
  });
});  


app.get("/api/objectives/:goalId", function(req, res) {
  Goal.find({'_id': req.params.goalId})
    .populate("objectives")
    .exec(function(err, doc) {
      console.log(doc);
    if (err) {
      console.log(err);
    }
    else {
      res.send(doc);
    }
  });
});  


app.get("/api/student/:studentId", function(req, res) {
  // We will find all the records, sort it in descending order, then limit the records to 5
  Student.find({'_id': req.params.studentId})
    .populate( "goals.goal")
    .populate( "goals.student_objectives")
    .deepPopulate( 'goals.student_objectives.objective goals.student_objectives.tasks')
    .exec(function(err, doc) {
    if (err) {
      console.log(err);
    }
    else {
      console.log("successful /api/student/:studentID");
      console.log(doc);
      res.send(doc);
    }
  }); 
});



app.get("/api/goal/:goalId", function(req, res) {
  // We will find all the records, sort it in descending order, then limit the records to 5
  Goal.find({'_id': req.params.goalId})
    .exec(function(err, doc) {
    if (err) {
      console.log(err);
    }
    else {
      console.log(doc);
      res.send(doc);
    }
  }); 
});

app.post("/api/school", function(req,res) {

  //   // Create a new note using the note text passed in during the ajax call
  var newSchool = new School(req.body);

  //   // And save the new school the db
   newSchool.save(function(error, doc) {
  //     // Log any errors
      if (error) {
        console.log(error);
      }
        res.send(doc);
    });
  });      


app.post("/api/goal", function(req,res) {

  //   // Create a new note using the note text passed in during the ajax call
  var newGoal = new Goal(req.body);

  //   // And save the new school the db
   newGoal.save(function(error, doc) {
  //     // Log any errors
      if (error) {
        console.log(error);
      }
        res.send(doc);
    });
  });    

  // // Create a new note and a reference to that note in the article - the id in req.params.id is the id of the article to which the note is attached

  app.post("/api/student/:school", function(req, res) {
    // Create a new Student using the student object passed in during the axios call
    var newStudent = new Student(req.body);

    // And save the new student the db
    newStudent.save(function(error, doc) {
      // Log any errors
      if (error) {
        console.log(error);
      }
      // Otherwise
      else {
        // Use the school name to find and update it's students array using the _id of the student that you just added to the db
        // That _id was just passed back to you after the save in doc._id

        School.findOneAndUpdate({ "name": req.params.school }, { $push: {"students": doc._id }}, {new: true}, function(err,doc){
          // Log any errors
          if (err) {
            console.log("there was an error in api/student/:school");
            res.send(err);
          }
          else {

            // Or send the document to the helper function
            res.send(doc);  
          }         
        });//end findOneAndUpdate       
      } //end else  
    }); //end newStudnet.save  
  }); //end app.post
//-------------------  End app.post "/api/student/:school" ----------------------------


  app.post("/api/objective/:goal", function(req, res) {
    // Create a new Student using the student object passed in during the axios call
    var newObjective = new Objective(req.body);

    // And save the new student the db
    newObjective.save(function(error, doc) {
      // Log any errors
      if (error) {
        console.log(error);
      }
      // Otherwise
      else {
        // Use the school name to find and update it's students array using the _id of the student that you just added to the db
        // That _id was just passed back to you after the save in doc._id

        Goal.findOneAndUpdate({ "_id": req.params.goal }, { $push: {"objectives": doc._id }}, {new: true}, function(err,doc){
          // Log any errors
          if (err) {
            console.log("there was an error in api/objective/:goal");
            res.send(err);
          }
          else {

            // Or send the document to the helper function
            res.send(doc);  
          }         
        });//end findOneAndUpdate       
      } //end else  
    }); //end newStudnet.save  
  }); //end app.post


//-------------------  End app.post "/api/objective/:goal" ----------------------------


  app.post("/api/studentgoal", function(req, res) {
    // Create a new Student using the student object passed in during the axios call
      var goalObject = {
        goal: req.body.goalId
      }
    // And save the new student the db


    //need to check here to keep user from adding same goal twice
    // or peferably alter the drop down so that the user cannot pick the same goal more than once

        Student.findOneAndUpdate({ "_id": req.body.studentId }, { $push: {"goals": goalObject }}, {new: true}, function(err,doc){
          // Log any errors
          if (err) {
            console.log("there was an error in /api/studentgoal");
            res.send(err);
          }
          else {

            // Or send the document to the helper function
            res.send(doc);  
          }         
        });//end findOneAndUpdate       
  }); //end app.post

  //-------------------  End app.post "/api/studentgoal" ----------------------------

    app.post("/api/studentobjective", function(req, res) {
      //this routine adds a record to the Student_Objective table. We then get the _id of the record that was
      //created in Student_Objectives. That id will then be pushed into the student_objectives array in the Student Record.
      console.log("req.body.goalId");
      console.log(req.body.goalId);

      var studentObjective = {
        student: req.body.studentId,
        objective: req.body.objectiveId
      }

      //note - check here first if the student already has this objective - if so don't add it
      // or,  preferably alter the drop down so that the user cannot pick the same objective more than once




    var newStudent_Objective = new Student_Objective(studentObjective);
    // And save the new student objective to the db
    newStudent_Objective.save(function(error, doc) {
      // Log any errors
      if (error) {
        console.log(error);
      }
      else {
        //we're going to go get the Student document for the specified student. We will grab the goals array, add to it appropriately,
        //and then update the document to reflect the added student_objective
        var so_id = doc._id;
        Student.findOne({ "_id": req.body.studentId }).exec(function(err,studentDoc){
          if (err) {
            console.log("there was an error in api/studentobjective");
            res.send(err);
          }
          else {
            console.log(studentDoc);
            for (var i=0; i< studentDoc.goals.length; i++){
              if(req.body.goalId == studentDoc.goals[i].goal){
                console.log("we have a match");
                studentDoc.goals[i].student_objectives.push(so_id);

                Student.findOneAndUpdate({ "_id": req.body.studentId }, {"goals": studentDoc.goals}, {new: true}, function(err,updateddoc){
                  if (err) {
                    console.log("findOneAndUpdate on goals failed");
                  }
                  else {
                    res.send(updateddoc);
                  }
                });
              }
              else {
                console.log("we did not find a match!");
              }
            }//end for         
        }//end else   
      }); //end Student.findOne
     }//end else 
  }); //end newStudent_Objective.save 
  }); //end app.post


//-------------------  End app.post "/api/studentobjective" ----------------------------





    app.post("/api/studenttask", function(req, res) {



      var task = {
        student: req.body.studentId,
        description: req.body.description
      }




    var newTask = new Task(task);
    // And save the new student objective to the db
    newTask.save(function(error, doc) {
      // Log any errors
      if (error) {

        console.log(error);
      }
      else {
        console.log("we saved the task");
        //we're going to go get the Student document for the specified student. We will grab the goals array, add to it appropriately,
        //and then update the document to reflect the added student_objective
        var task_id = doc._id;



        Student_Objective.findOneAndUpdate({ "_id": req.body.studentObjectiveId }, { $push: {"tasks": task_id }}, {new: true}, function(err,sodoc){
          // Log any errors
          if (err) {
            console.log("there was an error in api/studenttask");
            res.send(err);
          }
          else {

            // Or send the document to the helper function
            res.send(sodoc);  
          }         
        });


     }//end else 
  }); //end newTask.save 
  }); //end app.post


  app.post("/api/studentevaluation/:task_id", function(req, res) {

    Task.findOneAndUpdate({ "_id": req.params.task_id }, { $push: {"evaluations": req.body }}, {new: true}, function(err,doc){
          // Log any errors
          if (err) {
            console.log("there was an error in api/studentevaluation");
            res.send(err);
          }
          else {
            res.send(doc);  
          }         
        });//end findOneAndUpdate       

  }); //end app.post


//-------------------  End app.post "/api/objective/:goal" ----------------------------




//   // delete an article from database
  app.post('/api/delete/:schoolName', function(req, res){
    console.log(req.params.schoolName);
    School.findOneAndRemove({'name': req.params.schoolName}, function(err){
      if(err){
        console.log("DELETE ERROR", err)
      } else{
        // res.redirect("/api");

      }
    });

  });

};  //end of export
