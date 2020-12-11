import React from "react";
import {
  Form,
  Navbar,
  Nav,
  FormControl,
  Image,
  Dropdown,
  Container,
  ListGroup,
  Button,
} from "react-bootstrap";
import "../css/Evgeni.css";

//-projectID - name - text - date;

class Body extends React.Component {
  state = {
    name: "default",
    description: "default",
    dateAdded: "22/02/2001",
    currentProjects: [],
  };
  addProject = async () => {
    const project = {
      Name: this.state.name,
      Description: this.state.description,
      CreationDate: this.state.dateAdded,
    };
    console.log("actually in");
    try {
      let response = await fetch(`http://localhost:3002/projects`, {
        method: "POST",
        body: JSON.stringify(project),
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      });
      response = await response.json();
      if (response.ok) {
        console.log(response);
      } else {
        alert("not added");
      }

      console.log("Response: " + response);
      return response;
    } catch (e) {
      console.log("ERROR fetching HERE " + e);
    }
  };
  componentDidMount = async (prevState) => {
    try {
      let response = await fetch(`http://localhost:3002/projects`, {
        method: "GET",
      });
      response = await response.json();
      if (prevState !== response) {
      }
      console.log(response);
      this.setState({ currentProjects: response });
      return response;

      //console.log("user", response)
    } catch (e) {
      console.log("ERROR fetching HERE " + e);
    }
  };
  changeStateName = async (event) => {
    this.setState({ name: event.target.value });
    console.log(this.state);
  };
  changeStateDescription = async (event) => {
    this.setState({ description: event.target.value });
    console.log(this.state);
  };
  changeStateDate = async (event) => {
    this.setState({ dateAdded: event.target.value });
    console.log(this.state);
  };
  render() {
    return (
      <>
        <Form>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Name of the project</Form.Label>
            <Form.Control
              type="name"
              onChange={(event) => this.changeStateName(event)}
              placeholder="Name"
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Description of the project</Form.Label>
            <Form.Control
              type="email"
              onChange={(event) => this.changeStateDescription(event)}
              placeholder="Description"
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="email"
              onChange={(event) => this.changeStateDate(event)}
              placeholder="dd/mm/year"
            />
          </Form.Group>
          <Button onClick={() => this.addProject()}> Add Project </Button>
        </Form>
        {this.state.currentProjects.length !== 0 &&
          this.state.currentProjects.map((project) => (
            <Container className="project">
              <p>{project.Name}</p>
              <p>{project.Description}</p>
              <p>{project.CreationDate} </p>
            </Container>
          ))}
      </>
    );
  }
}
export default Body;
