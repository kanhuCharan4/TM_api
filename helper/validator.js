
    function validateTaskInfo(taskInfo){
       if(taskInfo.hasOwnProperty("title") && taskInfo.hasOwnProperty("description") && taskInfo.hasOwnProperty("completed"))
       { return {"status": true,
                 "Message": "payload validated successfully"}
        } 
        else{
            return {"status": false,
                 "Message": "Task info is not correct, please provide all the parameters"} 
        }

    }

    function isTaskIDValid(nextId , existingTaskData){

        let findExistingTaskWithSameId = existingTaskData.tasks.filter((val) => val.id == nextId)

        if(findExistingTaskWithSameId.length == 0){
            return true;
        }
        else{
            return false;
        }
    }


module.exports = {isTaskIDValid, validateTaskInfo}