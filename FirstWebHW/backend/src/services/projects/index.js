/*
1. get all projects on url --> localhost:3001/projects/
2. get single Projects on url --> localhost:3001/projects/:id
3. create a single Projects --> localhost:3001/projects
4. modify a single Projects --> localhost:3001/projects/:id
5. delete a single Projects --> localhost:3001/projects/:id
*/
/*
    Students Portfolio Repo
    
    You are in charge of creating a Student Portfolio Repo for both Frontend and Backend.
    In this last "step" the application should enable file upload & reviews.
    A review could be posted by a user to whatever project he likes.
    A review is defined by:
    - projectID
    - name
    - text
    - date
    
    //BACKEND
    You are in charge of building the Backend using NodeJS + Express. The backend should include the extra following routes:
    POST /students/id/uploadPhoto =>
     uploads a picture 
     (save as idOfTheStudent.jpg in the public/img/students folder)
      for the student specified by the id. Add a field on the students model called image, in where you store the newly created URL (http://localhost:3000/img/students/idOfTheStudent.jpg)
    POST /projects/id/uploadPhoto => 
    uploads a picture 
    (save as idOfTheProject.jpg in the public/img/projects folder) 
    for the project specified by the id. Add a field on the project model called image, in where you store the newly created URL (http://localhost:3000/img/projects/idOfTheProject.jpg)
    
    Configure Express to use the public folder to serve static files
    
    
    GET /projects => returns the list of projects
    GET /projects/id => returns a single project
    POST /projects => create a new project (Add an extra property NumberOfProjects on student and update it every time a new project is created)
    PUT /projects/id => edit the project with the given id
    DELETE /projects/id => delete the project with the given id
    
    GET /projects/id/reviews => get all the reviews for a given project
    POST /projects/id/reviews => add a new review for the given project
    [EXTRA] Edit & Delete
    
    //FRONTEND (extra)
    You are in charge of building the Frontend too. Use ReactJS to create an application for managing the students.
    Add the following features for the application
    - The user should be able to upload a picture for any given student
    - The user should be able to upload a picture for any given project
    - Create a component Avatar with picture and Name of the student. Use it on students' listing.
    - Change the Project Component to show the picture uploaded and the Reviews
*/

const express = require("express");
const fs = require("fs");
const path = require("path");
const uniqid = require("uniqid");
const projectsFilePath = path.join(__dirname, "projects.json");
const reviewsFilePath = path.join(__dirname, "reviews.json");
const myCardFilePath = path.join(__dirname, "myCard.json");
const router = express.Router();

const readFile = (fileName) => {
  const buffer = fs.readFileSync(path.join(__dirname, fileName));
  const fileContent = buffer.toString();
  return JSON.parse(fileContent);
};

router.get("/", (req, res) => {
  const projectsAsArray = readFile("projects.json");
  res.send(projectsAsArray);
});

router.get("/:identifier", (req, res) => {
  const projectsAsArray = readFile("projects.json");
  const reviewsAsArray = readFile("reviews.json");
  const idFromParams = req.params.identifier;
  const projectt = projectsAsArray.filter(
    (project) => project.id === idFromParams
  );
  const reviews = reviewsAsArray.filter(
    (project) => project._id === idFromParams
  );
  res.send({ projectt, reviews });
});

router.post("/", (req, res) => {
  const projectsAsArray = readFile("projects.json");

  //get the new project from the request's body
  const newProject = req.body;
  newProject.id = uniqid();
  projectsAsArray.push(newProject);
  fs.writeFileSync(projectsFilePath, JSON.stringify(projectsAsArray));
  res.status(201).send(newProject);
});

router.post("/reviews", (req, res) => {
  const projectsAsArray = readFile("reviews.json");

  //get the new project from the request's body
  const newProject = req.body;
  projectsAsArray.push(newProject);
  fs.writeFileSync(reviewsFilePath, JSON.stringify(projectsAsArray));
  res.status(201).send(newProject);
});
router.put("/:id", (req, res) => {
  const projectsAsArray = readFile("projects.json");
  //find the index
  const index = projectsAsArray.findIndex((user) => user.ID === req.params.id);
  const modifiedUser = req.body;
  modifiedUser.id = req.params.id;
  projectsAsArray[index] = modifiedUser;
  fs.writeFileSync(projectsFilePath, JSON.stringify(projectsAsArray));
  res.send("User Modified Succesfully");
});

router.delete("/:id", (req, res) => {
  const projectsAsArray = readFile("projects.json");
  //filter it out
  const newprojectsArray = projectsAsArray.filter(
    (project) => project.id !== req.params.id
  );
  fs.writeFileSync(projectsFilePath, JSON.stringify(newprojectsArray));
  res.send(newprojectsArray);
});

//MY CARD

router.post("/cards/myCard", (req, res) => {
  const projectsAsArray = readFile("myCard.json");

  //get the new project from the request's body
  const newProject = req.body;
  projectsAsArray.push(newProject);
  fs.writeFileSync(myCardFilePath, JSON.stringify(projectsAsArray));
  res.status(201).send(newProject);
});
router.get("/cards/myCard", (req, res) => {
  const myCardAsArray = readFile("myCard.json");
  res.send(myCardAsArray);
});
module.exports = router;
