# TaskManagerApi
The Task Manager API is a simple RESTful API built with Express.js and Node.js. It provides endpoints to manage tasks, including creating, reading, updating, and deleting tasks. Task data is stored in a JSON file.

## Features

- **GET /tasks**: Retrieve all tasks.
- **POST /tasks**: Create a new task.
- **PUT /tasks/:id**: Update an existing task by its ID.
- **DELETE /tasks/:id**: Delete a task by its ID.

## Installation

## Clone the repository:
   git clone 
## Dependencies

npm install

## The server will start running at http://localhost:3000 by default.


## Send a POST request to /tasks with JSON data containing the task details:
{
  "title": "New Task",
  "description": "New Task Description",
  "completed": false
}
## Send a PUT request to /tasks/:id with the task ID in the URL and JSON data containing the updated task details:
{
  "title": "Updated Task",
  "description": "Updated Task Description",
  "completed": true
}

## Send a DELETE request to /tasks/:id with the task ID in the URL.
## Getting All Tasks
Send a GET request to /tasks to retrieve all tasks.

## Project Structure
app.js: Main entry point of the application.
task.json: JSON file to store task data.
test/: Directory containing test files.
Testing
## Run the following command to execute the test cases:
npm run test
