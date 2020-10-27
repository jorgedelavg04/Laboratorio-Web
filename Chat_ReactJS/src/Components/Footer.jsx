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
      <footer>
           <div className="inside_footer">
                <Navbar color="dark" dark>
                    <Navbar bg="light" variant="dark">
                        <Navbar.Brand>
                        <h6 className="text-secondary">Copyright 2020, Gobierno de la Ciudad de México</h6>
                        </Navbar.Brand>
                    </Navbar>
                </Navbar>
            </div>
      </footer>
    );
  }
}
export default NavBar;
