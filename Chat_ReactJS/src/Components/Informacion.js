import React, { useEffect, useState, useCallback }  from 'react'
import { useAuth0, withAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import WidgetFA from "./widget";
import Cuidate from "../Images/cuidate_cdmx.jpeg"
import { Navbar, Nav, Form, FormControl, Button, Card } from "react-bootstrap";
import LogoutButton from "./LogoutButton";
import axios from 'axios';
import {HorizontalBar, Doughnut} from 'react-chartjs-2';
import Atención from '../Images/AtenciónCovid.jpg';
import { Carousel } from 'react-responsive-carousel';
import Servicios from '../Images/Servicios.jpg';
import Aviso from '../Images/AvisoImportantw.jpg';
import NoDiscriminación from '../Images/Imagen 2.png';
import PersonChatbot from '../Images/PersonChatbot.png';

class Informacion extends React.Component {
    state = {
        
    }
    
    componentDidMount() {
  
    }

    
    render() {
        
        return (
            <div className="container">
                    <div className="row mb-30">
                        <div className="col-sm-8 col-lg-8">
                            <div className="carousel-container-info">
                                    <Carousel showThumbs={false} showStatus={false} infiniteLoop useKeyboardArrows autoPlay> 
                                        <div>
                                            <img src={NoDiscriminación} />
                                        </div>
                                        <div>
                                            <img src={Aviso} />
                                        </div>
                                        <div>
                                            <img src={Atención} />
                                        </div>
                                    </Carousel>
                                </div>
                            </div>
                            <div className="col-sm-4 col-lg-4">
                                <div class="card" id="card1" style={{width: "18 rem"}}>
                                    <img class="card-img-top" src={PersonChatbot} alt="Card image cap" />
                                    <div class="card-body">
                                        <h5 class="card-title">¿Quieres hacer un reporte?</h5>
                                        <p class="card-text">Ingresa en la siguiente liga para utilizar nuestro asistente virtual. Te ayudará a realizar tu reporte y responder dudas sobre esta dependencia.</p>
                                        <a href="#" class="btn btn-primary">Go somewhere</a>
                                    </div>
                                </div>
                            </div>
                    </div>
            </div>
        )
    }
}
export default Informacion
