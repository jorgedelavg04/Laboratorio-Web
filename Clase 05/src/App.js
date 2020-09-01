//React Components
import React from "react";
import NavBar from "./Components/NavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Widget, addResponseMessage } from "react-chat-widget";
import "react-chat-widget/lib/styles.css";
import Home from "./Pages/Home";
import LandingPage from "./Pages/LandingPage";
import User from "./Pages/User";
import ChatBot from 'react-simple-chatbot';

const handleNewUserMessage = (newMessage) => {
  
  
  addResponseMessage("perro");
};

export default function App() {
  return (
    <Router>
      <NavBar />
      <ChatBot
        steps={[
          {
            id: '1',
            message: 'What is your name?',
            trigger: '2',
          },
          {
            id: '2',
            user: true,
            trigger: '3',
          },
          {
            id: '3',
            component: (
              <div>
                <h2><i>Hi, <sub>nice</sub> to meet you!</i></h2>
              </div>
            ),
            end: true,
          },
        ]}
        floating={true}
      />
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/user">
          <User />
        </Route>
      </Switch>
    </Router>
  );
}
