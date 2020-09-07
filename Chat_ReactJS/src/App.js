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
import axios from 'axios';

const handleNewUserMessage = (newMessage) => {
  //handleSubmit(newMessage);
  addResponseMessage("Hola");
};

var watson_response = ""

function sendData(messageFromUser) {

  axios.post('http://127.0.0.1:5002/getMessage', {
    message: messageFromUser
  })
  
  .then(async function (response) {
      watson_response = response.data.response_watson;
      console.log(watson_response);
      //return watson_response;
  })
  .catch(function (error) {
      console.log(error);
  });
}


export default function App() {
  return (
    <Router>
      <NavBar />
      <Widget
        handleNewUserMessage={handleNewUserMessage}
        title="TEC"
        subtitle="And my cool subtitle"
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
