import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Body from "./components/body";
import Products from "./components/products";
import {
  Row,
  Col,
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

function App() {
  return (
    <>
      <Row>
        <Col sm={4}> </Col>
        <Col sm={4}>
          {" "}
          <Body />{" "}
        </Col>
        <Col sm={4}> </Col>
      </Row>
      <Row>
        <Col sm={1}> </Col>
        <Col sm={10}>
          <Row>
            <Products />
          </Row>
        </Col>
        <Col sm={1}> </Col>
      </Row>
    </>
  );
}

export default App;
