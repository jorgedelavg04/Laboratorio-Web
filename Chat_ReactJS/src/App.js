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
    if (newMessage == "RESET") {
      this.sendData("Hola")
    }else {
      this.sendData(newMessage)
    }
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
      const watson_context_nombre = response.data.response_watson.watson_context_nombre;
      var array_response = []
      array_response = [watson_response, watson_intent, watson_context_nombre]
      console.log(watson_intent)
      console.log(watson_response)
      console.log(watson_context_nombre)
      
      toggleMsgLoader();
      if (watson_intent === 'Saludo') {
        renderCustomComponent(Image, {src: chatbot}) 
        renderCustomComponent(Text123, {text: watson_response});
        renderCustomComponent(Text123, {text: "<p>¿Cual es tu nombre?</p>"});
        
      } else if (watson_intent === 'Agradecimiento') {
        if (watson_response === "<p>Gracias, vuelve pronto 🙌.</p>") {
          renderCustomComponent(Text123, {text: watson_response})
          setQuickButtons([])
        } else if (watson_response === "<p>Por favor selecciona una de las opciones o escribe lo que necesites</p>") {
          renderCustomComponent(Text123, {text: watson_response})
          setQuickButtons([ { label: 'Nombre de la clase', value: 'Nombre de la clase' }, { label: 'Nombre del profesor', value: 'Nombre del profesor'} ]);
        } else {
          setQuickButtons([ { label: 'Si 👍', value: 'Si 👍' }, { label: 'No 👋', value: 'No 👋'} ]);
          renderCustomComponent(Image, {src: good_job}) 
          renderCustomComponent(Text123, {text: watson_response})
        }
      } else if (watson_response === "<p>"+watson_context_nombre+",  ¿qué puedo hacer por ti?</p>") {
        renderCustomComponent(Text123, {text: watson_response});
        setQuickButtons([ { label: 'Nombre de la clase', value: 'Nombre de la clase' }, { label: 'Nombre del profesor', value: 'Nombre del profesor'} ]);
      }else {
        console.log("aqui ando")
        console.log(watson_response)
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