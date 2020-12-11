import React, { Component } from "react";
import { Navbar, Row, Col } from "react-bootstrap";
import logo from "./image/Amazon.jpg";
import { Link } from "react-router-dom";

class navbar extends Component {
  render() {
    return (
      <div>
        <Navbar style={{ height: "65px", backgroundColor: "#131921" }}>
          <Navbar.Brand href="/">
            <img src={logo} style={{ height: "58px", width: "145px" }} />
          </Navbar.Brand>
          <Row>
            <Col>
              <button
                style={{
                  height: "45px",
                  width: "130px",
                  background: "#131921",
                  color: "white",
                  fontSize: "13px",
                }}
              >
                <div>
                  <p>
                    Deliver to <br />
                    Albania
                  </p>
                </div>
              </button>
            </Col>
            <Col>
              <input
                type="text"
                placeholder="Search.."
                style={{ height: "45px", width: "900px" }}
              />
            </Col>
            <Link to="/products">
              <Col>
                <button
                  style={{
                    height: "45px",
                    width: "140px",
                    background: "#131921",
                    color: "white",
                    fontSize: "14px",
                  }}
                >
                  <div>
                    <p>
                      Hello sing in
                      <br />
                      Account & list
                    </p>
                  </div>
                </button>
              </Col>
            </Link>
            <Col>
              <button
                style={{
                  height: "45px",
                  width: "120px",
                  background: "#131921",
                  color: "white",
                  fontSize: "14px",
                }}
              >
                <div>
                  <p>
                    Returns
                    <br />& orders
                  </p>
                </div>
              </button>
            </Col>
            <Col>
              <button
                style={{
                  height: "45px",
                  width: "120px",
                  background: "#131921",
                  color: "white",
                  fontSize: "14px",
                }}
              >
                <div>
                  <p>Card</p>
                </div>
              </button>
            </Col>
          </Row>
        </Navbar>
      </div>
    );
  }
}
export default navbar;
