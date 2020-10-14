//React Components
import React, { Component } from "react";
import NavBar from "./Components/NavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "react-chat-widget/lib/styles.css";
import Home from "./Pages/Home";
import LandingPage from "./Pages/LandingPage";
import User from "./Pages/User";
import '../src/App.css';
import WidgetFA from "./Components/widget";
import LoginButton from "./Components/LoginButton";
import LogoutButton from "./Components/LogoutButton";
import Profile from "./Components/Profile";


class App extends Component {

  render() {
    return (
      <Router>
        <NavBar />
        <Profile />
        <WidgetFA />
      </Router>
    );
  }
}

export default App;