//React Components
import React, { Component } from "react";
import { Widget, renderCustomComponent, setQuickButtons, addUserMessage, toggleMsgLoader} from "react-chat-widget";
import "react-chat-widget/lib/styles.css";
import ReactHtmlParser from 'html-react-parser';
import axios from 'axios';
import '../App.css';
import logo_cdmx from '../Images/logo_cdmx.jpg';
import ingenieros from '../Images/ingenieros.jpg';
import agua from '../Images/agua.jpg';
import titular from '../Images/titular.jpg'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Iframe from "react-iframe";
import { useAuth0 } from '@auth0/auth0-react';

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

class DemoCarousel extends Component {
  render() {
      return (
          <div className="carousel-container">
            <Carousel showThumbs={false} showStatus={false} infiniteLoop useKeyboardArrows autoPlay> 
              <div>
                  <img src={this.props.src1} />
              </div>
              <div>
                  <img src={this.props.src2} />
              </div>
              <div>
                  <img src={this.props.src3} />
              </div>
            </Carousel>
          </div>
      );
  }
}

class SimpleMap extends Component {
  render() {
    return (
      // Important! Always set the container height explicitly
      <Iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.7037959465347!2d-99.13666119999999!3d19.4252!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1fed1a5fd3a4d%3A0x8c390d32c3d1510a!2ssacmex!5e0!3m2!1ses-419!2smx!4v1601938761977!5m2!1ses-419!2smx" width="215" height="215" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"/>
      );
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

      const watson_intent = response.data.intent;
      const watson_nid = response.data.nid;
      const watson_response = response.data.response;
    
      if (watson_intent === "General_Greetings") {
        renderCustomComponent(DemoCarousel, {src1: logo_cdmx, src2: ingenieros, src3: agua});
        renderCustomComponent(Text123, {text: watson_response});
        renderCustomComponent(Text123, {text: "<p>¿En que puedo ayudarte?</p>"});
        setQuickButtons([ { label: 'Hacer un reporte', value: 'Hacer un reporte' }, { label: 'Nuestras Oficinas', value: 'Nuestras Oficinas'}, { label: 'Realizar Pago', value: 'Realizar Pago'} ]);
      }else if(watson_intent === "ReportarFuga"){
        for (var key in watson_response){
          renderCustomComponent(Text123, {text: watson_response[key]});
          setQuickButtons([]);
        }
      }else if(watson_nid === "reporte-realizado") {
        for (var key_nid in watson_response){
          renderCustomComponent(Text123, {text: watson_response[key_nid]});
          setQuickButtons([ { label: 'Si', value: 'Si' }, { label: 'No', value: 'No'} ]);
        }
      }else if (watson_intent === "small_talk_duda_generica"){
        for (var key_nid_2 in watson_response){
          renderCustomComponent(Text123, {text: watson_response[key_nid_2]});
          setQuickButtons([]);
        }
        setQuickButtons([ { label: 'Hacer un reporte', value: 'Hacer un reporte' }, { label: 'Nuestras Oficinas', value: 'Nuestras Oficinas'}, { label: 'Realizar Pago', value: 'Realizar Pago'} ]);
      }else if (watson_intent === "Oficina") {
        renderCustomComponent(SimpleMap);
        renderCustomComponent(Text123, {text: watson_response});
        setQuickButtons([ { label: 'Sobre nosotros', value: 'Sobre nosotros' } ]);
      }else if (watson_nid === "anyelse-info") {
        renderCustomComponent(Text123, {text: watson_response});
        setQuickButtons([ { label: 'Nuestro coordinador', value: 'Nuestro coordinador' } ]);
      }else if (watson_nid === "secretario") {
        setQuickButtons([]);
        renderCustomComponent(Image, {src: titular});
        renderCustomComponent(Text123, {text: watson_response});
      }else if (watson_nid === "pago" && watson_intent === "pago"){
        for (var key_nid_3 in watson_response){
          renderCustomComponent(Text123, {text: watson_response[key_nid_3]});
          setQuickButtons([]);
        }
      }else{
        renderCustomComponent(Text123, {text: watson_response});
        setQuickButtons([]);
      }
      toggleMsgLoader();

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