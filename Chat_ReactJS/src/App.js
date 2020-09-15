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
import good_job from '../src/Images/good_job.gif';
import chatbot from '../src/Images/chatbot.jpg'
import we_love_you from '../src/Images/love_you.gif';

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

  handleNewUserMessage = (newMessage) => {
    toggleMsgLoader();
    this.sendData(newMessage);
  }

  handleQuickButtonClicked = (value) => {
    addUserMessage(value);
    this.handleNewUserMessage(value);
    
  };

  async sendData(messageFromUser) {
    return axios.post('http://127.0.0.1:5002/getMessage', {
      message: messageFromUser
    })
    .then((response) => {
      console.log(response);
      const watson_intent = response.data.response_watson.watson_intent;
      const watson_context_nombre = response.data.response_watson.watson_context_nombre;
      const watson_response = response.data.response_watson.watson_answer;
      var array_response = [];
      array_response = [watson_response, watson_intent, watson_context_nombre];
      
      if (watson_intent === 'General_Greetings') {
        renderCustomComponent(Image, {src: chatbot});
      }
      for (const property in watson_response) {
        if (`${watson_response[property]}` === "<p>"+watson_context_nombre+",  ¿qué puedo hacer por ti?</p>") {
          renderCustomComponent(Text123, {text: `${watson_response[property]}`});
          setQuickButtons([ { label: 'Hacer un reporte', value: 'Hacer un reporte' }, { label: 'Nuestras Oficinas', value: 'Nuestras Oficinas'} ]);
        }else if (`${watson_response[property]}` === "<p>¡Te deseamos mucho éxito! 😍 ¡Fue un placer atenderte! 👋</p>") {
          setQuickButtons([]);
          renderCustomComponent(Image, {src: good_job});
          renderCustomComponent(Text123, {text: `${watson_response[property]}`});
        }else if (`${watson_response[property]}` === '<p>¿Te puedo ayudar en algo más?  😊</p>') {
          setQuickButtons([ { label: 'Si', value: 'Si' }, { label: 'No', value: 'No'} ]);
          renderCustomComponent(Text123, {text: `${watson_response[property]}`});
        }else if (`${watson_response[property]}` === '') {
          renderCustomComponent(Text123, {text:'<p>Por favor, reformula tu pregunta</p>'});
          setQuickButtons([]);
        }else{
          renderCustomComponent(Text123, {text: `${watson_response[property]}`});
          setQuickButtons([]);
        } 
      }
      toggleMsgLoader();

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
          title="Sistema de Reportes de Agua"
          subtitle="CDMX"

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