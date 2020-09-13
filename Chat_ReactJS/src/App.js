//React Components
import React, { Component } from "react";
import NavBar from "./Components/NavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Widget, addResponseMessage, renderCustomComponent } from "react-chat-widget";
import "react-chat-widget/lib/styles.css";
import Home from "./Pages/Home";
import LandingPage from "./Pages/LandingPage";
import User from "./Pages/User";
import ReactHtmlParser from 'html-react-parser';
import axios from 'axios';
import '../src/App.css'

//This is the image component, copy it to your project
class Text123 extends Component {
  render() {
  return <div className="speech-bubble">{ReactHtmlParser(this.props.text)}</div>
  }
}

class App extends Component {
  /*
  handleNewUserMessage = (newMessage) => { 
    this.sendData(newMessage).then(function(response) {
      addResponseMessage(String(response[0]));
    });

  };*/

  handleNewUserMessage = (newMessage) => {
    this.sendData(newMessage)
  }


  async sendData(messageFromUser) {
    return axios.post('http://127.0.0.1:5002/getMessage', {
      message: messageFromUser
    })
    .then((response) => {
      const watson_response = response.data.response_watson.watson_answer;
      const watson_intent = response.data.response_watson.watson_intent;
      var array_response = []
      array_response = [watson_response, watson_intent]
      //Aquí es donde se envia el texto con el renderCustomComponent
      renderCustomComponent(Text123, {text: watson_response})
      return array_response;
    })
    .catch(function (error) {
        console.log("Error: " + error );
    });
  }

  render() {
    return (
      <Router>
        <NavBar />
        <Widget
          handleNewUserMessage={this.handleNewUserMessage}
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
}

export default App;