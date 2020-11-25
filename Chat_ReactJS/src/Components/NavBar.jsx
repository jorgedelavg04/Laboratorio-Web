import React from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";
import logo from '../Images/Logo_CDMX.png';
import logo_dependencia from '../Images/Logo_Dependencia.png';
import "./components.css";
class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "Que buscamos?",
    };
  }

  searchItem = (params) => {
    this.setState({
      search: params.target.value,
    });
  };

  render() {
    return (
      <div className="navbar-top">
        <Navbar collapseOnSelect bg="light" variant="dark">
          <Navbar.Brand href="/">
            <img src={logo} id="logo"/>
            <img src={logo_dependencia} id="logo2"/>
          </Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/">Inicio</Nav.Link>
            <Nav.Link href="/user">Estadística</Nav.Link>
            <Nav.Link href="/location">Ubicaciones</Nav.Link>
          </Nav>
          <Form inline>
            <LoginButton />
            <LogoutButton />
          </Form>
        </Navbar>
      </div>
    );
  }
}
export default NavBar;
