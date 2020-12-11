import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Body from "./components/body";
import Products from "./components/products";
import Navbar from "./components/NavBar";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
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
      <>
        <Router>
          <Navbar />
          <Route path="/" exact component={Products} />
          <Route path="/products" component={Body} />
        </Router>
      </>
    </>
  );
}

export default App;
