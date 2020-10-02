//React Components
import React, { Component } from "react";
import { Widget, addResponseMessage, renderCustomComponent, setQuickButtons, addUserMessage, toggleMsgLoader} from "react-chat-widget";
import "react-chat-widget/lib/styles.css";
import ReactHtmlParser from 'html-react-parser';
import axios from 'axios';
import '../App.css';
import good_job from '../Images/good_job.gif';
import chatbot from '../Images/chatbot.jpg'
import titular from '../Images/titular.jpg'

class Text123 extends Component {
  render() {
  return <div className="speech-bubble">{ReactHtmlParser(this.props.text)}</div>
  }
}

class Image extends Component {
  render() {
    return <div className="speech-bubble-image"><img src={this.props.src}></img></div>
  }
}

class widget extends Component {

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
      
      const watson_intent = response.data.intent;
      const watson_nid = response.data.nid;
      const watson_response = response.data.response;
      
      console.log(watson_response)
      console.log(watson_intent)
      console.log(watson_nid)
    
      if (watson_intent == "General_Greetings") {
        renderCustomComponent(Image, {src: chatbot});
        renderCustomComponent(Text123, {text: watson_response});
        renderCustomComponent(Text123, {text: "<p>¿En que puedo ayudarte?</p>"});
        setQuickButtons([ { label: 'Hacer un reporte', value: 'Hacer un reporte' }, { label: 'Nuestras Oficinas', value: 'Nuestras Oficinas'} ]);
      }else if(watson_intent == "ReportarFuga"){
        for (var key in watson_response){
          renderCustomComponent(Text123, {text: watson_response[key]});
          setQuickButtons([]);
        }
      }else if(watson_nid == "reporte-realizado") {
        for (var key in watson_response){
          renderCustomComponent(Text123, {text: watson_response[key]});
          setQuickButtons([ { label: 'Si', value: 'Si' }, { label: 'No', value: 'No'} ]);
        }
      }else if (watson_intent == "small_talk_duda_generica"){
        for (var key in watson_response){
          renderCustomComponent(Text123, {text: watson_response[key]});
          setQuickButtons([]);
        }
        setQuickButtons([ { label: 'Hacer un reporte', value: 'Hacer un reporte' }, { label: 'Nuestras Oficinas', value: 'Nuestras Oficinas'} ]);
      }else if (watson_intent == "Oficina") {
        renderCustomComponent(Text123, {text: watson_response});
        setQuickButtons([ { label: 'Sobre nosotros', value: 'Sobre nosotros' } ]);
      }else if (watson_nid == "anyelse-info") {
        renderCustomComponent(Text123, {text: watson_response});
        setQuickButtons([ { label: 'Nuestro coordinador', value: 'Nuestro coordinador' } ]);
      }else if (watson_nid == "secretario") {
        setQuickButtons([]);
        renderCustomComponent(Image, {src: titular});
        renderCustomComponent(Text123, {text: watson_response});
      }
      else{
        renderCustomComponent(Text123, {text: watson_response});
        setQuickButtons([]);
      }
      toggleMsgLoader();

      //return array_response;
    })
    .catch(function (error) {
        console.log("Error: " + error );
    });
  }

  render() {
    return (
        <Widget
          handleNewUserMessage={this.handleNewUserMessage}
          handleQuickButtonClicked={this.handleQuickButtonClicked}
          title="Sistema de Reportes de Agua"
          subtitle="CDMX"
        />
    );
  }
}

export default widget;