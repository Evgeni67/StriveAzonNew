import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Body from "./components/body";
import Products from "./components/products";
import Navbar from "./components/navbar";
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

function App() {
  return (
    <>
      <Navbar />
      <Row>
        <Col sm={3}> </Col>
        <Col sm={6}>
          {" "}
          <Body />{" "}
        </Col>
        <Col sm={3}> </Col>
      </Row>
    </>
  );
}

export default App;
