//React Components
import React from "react";
import NavBar from "./Components/NavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Widget, addResponseMessage } from "react-chat-widget";
import "react-chat-widget/lib/styles.css";
import Home from "./Pages/Home";
import LandingPage from "./Pages/LandingPage";
import User from "./Pages/User";
import ReactHtmlParser from 'html-react-parser';
import axios from 'axios';

const handleNewUserMessage = (newMessage) => { 
  sendData(newMessage).then(function(response) {
    addResponseMessage(String(response[0]));
  });
};

const url = 'http://127.0.0.1:5002/getMessage'
async function sendData(messageFromUser) {

  return axios.post(url, {
    message: messageFromUser
  })
  .then((response) => {
    const watson_response = response.data.response_watson.watson_answer;
    const watson_intent = response.data.response_watson.watson_intent;
    var array_response = []
    array_response = [watson_response, watson_intent]
    return array_response;
  })
  .catch(function (error) {
      console.log("Error: " + error );
  });
}

export default function App() {
  return (
    <Router>
      <NavBar />
      <Widget
        handleNewUserMessage={handleNewUserMessage}
        title="Laboratorio Web"
        subtitle="Bienvenido"
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
