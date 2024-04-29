const express = require('express');
const app = express();
app.use(express.json());
const fs = require('fs');
const validator = require('./helper/validator');

const port = 3000;
const taskData = require('./task.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



//1. GET /tasks: Retrieve all tasks.
app.get('/tasks', (req, res) => {
    //res.json(taskData.tasks);
    return res.status(200).json(taskData.tasks);
})

//2. GET /tasks/:id:
app.get('/tasks/:id', (req, res) => {
    try{
        let tasks = taskData.tasks;
    let taskId = parseInt(req.params.id); 
    let filteredTask = tasks.filter((val) => val.id == taskId);
    
     if(filteredTask.length == 0){
        return res.status(404).send("No usch task found , check with a valid id");    
    }
    else{
        return res.status(200).json(filteredTask);
    } 

    }catch(err) {return res.status(500).send("Server error , try again");}

})

//POST /tasks: Create a new task.

app.post('/tasks', (req, res) =>{

    try{
    const userProvidedDetails = req.body;
    console.log(userProvidedDetails);
    // Generate ID for new task
    const newId = taskData.tasks.length + 1;

  
    if(validator.validateTaskInfo(userProvidedDetails).status == true)
    {
        
          let taskDataModified = taskData;
          userProvidedDetails.id = newId;

            taskDataModified.tasks.push(userProvidedDetails);
        //file writing operation
        fs.writeFile("./task.json", JSON.stringify(taskDataModified), {encoding: 'utf-8', flag: 'w'},
                     (err,data)=> {
                        if(err){return res.status(500).send("Internal server error, something went wrong");}
                        else{return res.status(201).send("successfully added");}
                     });

        }
    else{
        let message = validator.validateTaskInfo(userProvidedDetails).Message;
        return res.status(400).send(message);
    }

  }catch(err) {return res.status(500).send("Server error , try again");}
   
})

//PUT /tasks/:id: Update an existing task by its ID.

app.put('/tasks/:id', (req, res) => {
    try{
  let taskId = parseInt(req.params.id);
  const userProvidedDetails = req.body;

  if(validator.validateTaskInfo(userProvidedDetails).status == true)
  {
    const taskIndex = taskData.tasks.findIndex(task => task.id === taskId);
    if (taskIndex === -1) {
        return res.status(404).send("Task with the given id is not found");
    }
    else{
       // Updating the task with the new data from the request body
        taskData.tasks[taskIndex] = Object.assign({}, taskData.tasks[taskIndex], userProvidedDetails);
        //file writing operation
        fs.writeFile("./task.json", JSON.stringify(taskData), {encoding: 'utf-8', flag: 'w'},
                     (err,data)=> {
                        if(err){return res.status(500).send("Internal server error, something went wrong");}
                        else{return res.status(201).send("successfully updated");}
                     }) ;
 
    }

  }
  else{
    let message = validator.validateTaskInfo(userProvidedDetails).Message;
    return res.status(400).send(message);
}

    } catch(err) {return res.status(500).send("Server error , try again");}
});

// DELETE /tasks/:id: Delete a task by its ID.
app.delete('/tasks/:id', (req, res) => {
    try {
        const taskId = parseInt(req.params.id);

        // Find the index of the task with the given ID
        const taskIndex = taskData.tasks.findIndex(task => task.id === taskId);

        // If task with given ID does not exist, return 404 Not Found
        if (taskIndex === -1) {
            return res.status(404).send("Task with the given id is not found");
        }
        else{
            // Remove the task from the tasks array
        const deletedTask = taskData.tasks.splice(taskIndex, 1)[0];
               //file writing operation
        fs.writeFile('./task.json', JSON.stringify(taskData),{encoding: 'utf-8', flag: 'w'}, (err) => {
            if (err) {
                console.error(err);
                // Rollback the deletion by re-inserting the deleted task
                taskData.tasks.splice(taskIndex, 0, deletedTask);
                return res.status(500).send("Error deleting task, please try again");
            }
            return res.status(200).send("Deleted successfully");
        });
            
        }

        
 } catch (err) {return res.status(500).send("Server error , try again");}
});




app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});



module.exports = app;