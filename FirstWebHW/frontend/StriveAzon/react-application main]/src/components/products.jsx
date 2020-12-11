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
  Card,
  Modal,
} from "react-bootstrap";
import "../css/Evgeni.css";
class Products extends React.Component {
  state = {
    currentProjects: [],
    isOpen: false,
    isSecondOpen: false,
    currentId: "",
    comments: [],
    rate: 1,
  };
  openModal = (e) => {
    this.setState({
      isOpen: true,
      currentId: e.currentTarget.parentElement.children[0].innerText,
    });
  };
  closeModal = () => this.setState({ isOpen: false });
  openSecondModal = () => {
    this.setState({
      isSecondOpen: true,
    });
  };
  closeSecondModal = () => this.setState({ isSecondOpen: false });
  addReview = async () => {
    const project = { _id: this.state.currentId, comment: this.state.comment };

    console.log("actually in");
    try {
      let response = await fetch(`http://localhost:3002/projects/reviews`, {
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
        alert("wtf");
      }

      console.log("Response: " + response);
      return response;
    } catch (e) {
      console.log("ERROR fetching HERE " + e);
    }
  };

  deleteProduct = async (e) => {
    let id = e.currentTarget.parentElement.children[0].innerText;
    try {
      let response = await fetch(`http://localhost:3002/projects/${id}`, {
        method: "DELETE",
      });
      response = await response.json();
      if (response.ok) {
        console.log(response);
      } else {
        alert("The respose is not ok but still added tho");
      }

      console.log("Response: " + response);
      return response;
    } catch (e) {
      console.log("ERROR fetching HERE " + e);
    }
  };
  changeStateComment = async (event) => {
    this.setState({ comment: event.target.value });
    console.log(this.state);
  };
  changeStateRate = async (event) => {
    this.setState({ rate: event.taget.value });
    console.log(this.state);
  };
  getTheReviews = async (e) => {
    this.openSecondModal();
    let id = e.currentTarget.parentElement.children[0].innerText;
    try {
      let response = await fetch(`http://localhost:3002/projects/${id}`, {
        method: "GET",
      });
      response = await response.json();
      this.setState({ comments: response.reviews });
      console.log(response.reviews);
      return response;

      //console.log("user", response)
    } catch (e) {
      console.log("ERROR fetching HERE " + e);
    }
  };
  setTheReviews = async (id) => {
    try {
      let response = await fetch(`http://localhost:3002/projects/${id}`, {
        method: "GET",
      });
      response = await response.json();
      this.setState({ comments: response.reviews });
      console.log(response.reviews);
      return response;

      //console.log("user", response)
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

      console.log(response);
      this.setState({ currentProjects: response });
      return response;

      //console.log("user", response)
    } catch (e) {
      console.log("ERROR fetching HERE " + e);
    }
  };
  componentDidUpdate = async (prevState) => {
    if (prevState !== this.state) {
      try {
        let response = await fetch(`http://localhost:3002/projects`, {
          method: "GET",
        });
        response = await response.json();

        console.log(response);
        this.setState({ currentProjects: response });
        return response;

        //console.log("user", response)
      } catch (e) {
        console.log("ERROR fetching HERE " + e);
      }
    }
  };
  render() {
    return (
      <>
        <Modal show={this.state.isSecondOpen}>
          <Modal.Header>
            <Modal.Title>Reviews</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.state.comments.map((comment) => (
              <p>{comment.comment} </p>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.closeSecondModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={this.state.isOpen}>
          <Modal.Header>
            <Modal.Title>Add A Review</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Rate:</Form.Label>
                <Form.Control as="select">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Comment</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(event) => this.changeStateComment(event)}
                  placeholder="Dont be rude pls"
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => this.addReview()}>
              Sumbit Comment
            </Button>
            <Button variant="secondary" onClick={this.closeModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        {this.state.currentProjects.length !== 0 &&
          this.state.currentProjects.map((project) => (
            <Card style={{ width: "18rem" }} value={project.id}>
              <Card.Img variant="top" src={project.image} />
              <Card.Body>
                <div className="d-none">{project.id}</div>
                <Card.Title>{project.name}</Card.Title>
                <Card.Text>{project.description}</Card.Text>
                <Card.Text>Brand / {project.brand}</Card.Text>
                <Button variant="success">Buy Now {project.price}</Button>
                <Button variant="primary" onClick={(e) => this.openModal(e)}>
                  Add a review
                </Button>
                <Button variant="info" onClick={(e) => this.getTheReviews(e)}>
                  See Reviews
                </Button>
                <Button variant="danger" onClick={(e) => this.deleteProduct(e)}>
                  Delete Product{" "}
                </Button>
              </Card.Body>
            </Card>
          ))}
      </>
    );
  }
}
export default Products;
