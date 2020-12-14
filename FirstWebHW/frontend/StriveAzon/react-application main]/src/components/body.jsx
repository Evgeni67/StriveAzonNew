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
  Row,
} from "react-bootstrap";
import "../css/Evgeni.css";
import Products from "../components/products";
//-projectID - name - text - date;
/*
"_id": "5d318e1a8541744830bef139", //SERVER GENERATED
        "name": "app test 1",  //REQUIRED
        "description": "somthing longer", //REQUIRED
        "brand": "nokia", //REQUIRED
        "imageUrl": "https://drop.ndtv.com/TECH/product_database/images/2152017124957PM_635_nokia_3310.jpeg?downsize=*:420&output-quality=80",
        "price": 100, //REQUIRED
        "category": "smartphones"
        */
class Body extends React.Component {
  state = {
    name: "default",
    description: "default",
    dateAdded: "22/02/2001",
    currentProjects: [],
    image: "",
    brand: "",
    price: "",
  };
  addProject = async () => {
    const project = this.state;
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

  changeStateName = async (event) => {
    this.setState({ name: event.target.value });
    console.log(this.state);
  };
  changeStateImage = async (event) => {
    this.setState({ image: event.target.value });
    console.log(this.state);
  };
  changeStateDescription = async (event) => {
    this.setState({ description: event.target.value });
    console.log(this.state);
  };
  changeStateBrand = async (event) => {
    this.setState({ brand: event.target.value });
    console.log(this.state);
  };
  changeStatePrice = async (event) => {
    this.setState({ price: event.target.value });
    console.log(this.state);
  };

  render() {
    return (
      <>
        <div className="mainDiv">
          <Form>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                onChange={(event) => this.changeStateName(event)}
                placeholder="Name"
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="email"
                onChange={(event) => this.changeStateDescription(event)}
                placeholder="Description"
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                onChange={(event) => this.changeStateBrand(event)}
                placeholder="No nokias please"
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                onChange={(event) => this.changeStatePrice(event)}
                placeholder="$$$"
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                onChange={(event) => this.changeStateImage(event)}
                placeholder="URL"
              />
            </Form.Group>

            <Button onClick={() => this.addProject()}> Add Project </Button>
          </Form>
          <Row>
            <Products />
          </Row>
        </div>
      </>
    );
  }
}
export default Body;
