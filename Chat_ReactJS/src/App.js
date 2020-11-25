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
import Location from "./Components/Location"
import Footer from "./Components/Footer";
import Statistics from "./Components/Statistics";
import { Auth0Provider, useAuth0, withAuthenticationRequired} from '@auth0/auth0-react';
import Callback from '../src/Components/Callback';

class App extends Component {
  render() {    
    return (      
      <Router>
        <NavBar />
          <Switch>
            <Route exact path="/">
            <Profile />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/user">
              <Statistics />
            </Route>
            <Route path="/location">
              <Location />
            </Route>
          </Switch>
        <Footer />
      </Router>
    );
  }
}

export default App;