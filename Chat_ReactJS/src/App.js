//React Components
import React, { Component } from "react";
import NavBar from "./Components/NavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Widget, addResponseMessage, renderCustomComponent, setQuickButtons, addUserMessage, toggleMsgLoader} from "react-chat-widget";
import "react-chat-widget/lib/styles.css";
import Home from "./Pages/Home";
import LandingPage from "./Pages/LandingPage";
import User from "./Pages/User";
import ReactHtmlParser from 'html-react-parser';
import axios from 'axios';
import '../src/App.css';
import good_job from '../src/Images/well_done.gif';
import chatbot from '../src/Images/chatbot.jpg'

//This is the image component, copy it to your project
class Text123 extends Component {
  render() {
  return <div className="speech-bubble">{ReactHtmlParser(this.props.text)}</div>
  }
}

class Image extends Component {
  render() {
    return <img src={this.props.src}></img>
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
    toggleMsgLoader();
    this.sendData(newMessage)

  }

  handleQuickButtonClicked = (value) => {
    addUserMessage(value)
    this.handleNewUserMessage(value)
    
  };


  async sendData(messageFromUser) {
    return axios.post('http://127.0.0.1:5002/getMessage', {
      message: messageFromUser
    })
    .then((response) => {
      console.log(response)
      const watson_response = response.data.response_watson.watson_answer;
      const watson_intent = response.data.response_watson.watson_intent;
      var array_response = []
      array_response = [watson_response, watson_intent]
      console.log(watson_intent)
      console.log(watson_response)
      
      toggleMsgLoader();
      if (watson_intent === 'Saludo') {
        renderCustomComponent(Image, {src: chatbot}) 
        renderCustomComponent(Text123, {text: watson_response});
        setQuickButtons([ { label: 'Nombre de la clase', value: 'Nombre de la clase' }, { label: 'Nombre del profesor', value: 'Nombre del profesor'} ]);

      } else if (watson_intent === 'Agradecimiento') {
        renderCustomComponent(Image, {src: good_job}) 
        renderCustomComponent(Text123, {text: watson_response})
      } else {
        setQuickButtons([])
        renderCustomComponent(Text123, {text: watson_response})
      }
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
          handleQuickButtonClicked={this.handleQuickButtonClicked}
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