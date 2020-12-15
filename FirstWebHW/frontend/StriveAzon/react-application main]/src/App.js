import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Body from "./components/body";
import Products from "./components/products";
import MyNavbar from "./components/navbar";
import {
  Row,
  Col,
  Form,
  Nav,
  FormControl,
  Image,
  Dropdown,
  Container,
  ListGroup,
  Button,
} from "react-bootstrap";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
    };
  }
  getCurrentUser = () => {
    return this.state.currentUser;
  };
  onUserChange = (currentUser) => {
    this.setState({ user: currentUser });
  };
  render() {
    return (
      <>
        <MyNavbar
          onUserChange={this.onUserChange}
          getTheCurrentUser={this.state.user}
        />
        <Row>
          <Col sm={3}> </Col>
          <Col sm={6}>
            <Body />{" "}
            <Row>
              {" "}
              <Products
                currentUser={this.state.user}
                getTheCurrentUser={this.state.user}
              />{" "}
            </Row>
            a<Col sm={3}> </Col>
          </Col>
        </Row>
      </>
    );
  }
}

export default App;
