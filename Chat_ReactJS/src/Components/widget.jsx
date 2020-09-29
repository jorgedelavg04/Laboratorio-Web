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
        }else if (watson_intent === 'Oficina') {
            renderCustomComponent(Text123, {text: `${watson_response[property]}`});
            setQuickButtons([ { label: 'Sobre nosotros', value: 'Sobre nosotros' } ]);
        }else if (`${watson_response[property]}` === '<p>A partir del 1 de enero de 2003 entró en funcionamiento el Sistema de Aguas de la Ciudad de México (<strong>SACMEX</strong>), por decreto del Jefe de Gobierno del Distrito Federal, Lic. Andrés Manuel López Obrador, al fusionar la entonces Dirección General de Construcción y Operación Hidráulica (DGCOH) y la Comisión de Aguas del Distrito Federal (CADF). </p>') {
            renderCustomComponent(Text123, {text: `${watson_response[property]}`});
            setQuickButtons([ { label: 'Nuestro coordinador', value: 'Nuestro coordinador' } ]);
        }else if(`${watson_response[property]}` === '<p>El Coordinador General del Sistema de Aguas de la CDMX es <strong>Rafael Bernardo Carmona Paredes</strong></p>\n<p>Su teléfono es 5551304444 ext. 1316, 1317, 1319</p>' ) {
            setQuickButtons([]);
            renderCustomComponent(Image, {src: titular});
            renderCustomComponent(Text123, {text: `${watson_response[property]}`});
        }
        else{
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