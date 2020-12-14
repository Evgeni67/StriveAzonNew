import React from "react";
import { FiShoppingCart } from "react-icons/fi";
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
  Modal,
  Card,
} from "react-bootstrap";
import "../css/Evgeni2.css";
class MyNavbar extends React.Component {
  state = {
    card: [],
    isOpen: false,
    currentItemsInState: [],
    totalPrice: 0,
  };
  mountTheItems = async (id) => {
    try {
      let response = await fetch(`http://localhost:3002/projects/${id._id}`, {
        method: "GET",
      });
      response = await response.json();
      console.log("---> MOUNT THE ITEMS INFORMATION <--- ");
      let getTotalPrice = this.state.totalPrice;
      getTotalPrice += parseInt(response.projectt[0].price);
      this.setState({ totalPrice: getTotalPrice });
      let currentItems = this.state.currentItemsInState;
      currentItems.push(response);
      this.setState({
        currentItemsInState: currentItems,
      });
      return response;

      //console.log("user", response)
    } catch (e) {
      console.log("ERROR fetching HERE " + e);
    }
  };
  componentDidMount = async () => {
    try {
      let response = await fetch(
        `http://localhost:3002/projects/cards/myCard`,
        {
          method: "GET",
        }
      );
      response = await response.json();
      await this.setState({ card: response });
      console.log("---- NAVBAR INFORMATION ----");
      console.log(response);
      return response;

      //console.log("user", response)
    } catch (e) {
      console.log("ERROR fetching HERE " + e);
    }
  };
  CloseModal = () => {
    this.setState({ isOpen: false, currentItemsInState: [] });
  };
  OpenModal = () => {
    this.setState({ isOpen: true });
    this.state.card.forEach((id) => {
      this.mountTheItems(id);
    });
    console.log(this.state.currentItemsInState);
  };
  render() {
    return (
      <>
        <Navbar bg="dark " variant="dark">
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            <Nav.Link href="#shoppingCard" onClick={() => this.OpenModal()}>
              <FiShoppingCart />
            </Nav.Link>
          </Nav>
        </Navbar>
        <Modal show={this.state.isOpen}>
          <Modal.Header>
            <Modal.Title>Your Card</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              {this.state.currentItemsInState !== undefined &&
                this.state.currentItemsInState.map((project) => (
                  <Card className="cardProduct" style={{ width: "9rem" }}>
                    <Card.Img variant="top" src={project.projectt[0].image} />

                    <Card.Body>
                      <div className="d-none">{project.projectt[0].id}</div>
                      <Card.Title>{project.projectt[0].name}</Card.Title>
                      <Card.Text>{project.projectt[0].description}</Card.Text>
                      <Card.Text>Brand / {project.projectt[0].brand}</Card.Text>
                      <Button variant="success">
                        Price: £{project.projectt[0].price}
                      </Button>
                      <Button variant="danger">
                        Remove product from card{" "}
                      </Button>
                    </Card.Body>
                  </Card>
                ))}
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <div>Total price: £{this.state.totalPrice} </div>
            <Button variant="secondary" onClick={() => this.CloseModal()}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
export default MyNavbar;
