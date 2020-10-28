import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import WidgetFA from "./widget";
import Cuidate from "../Images/cuidate_cdmx.jpeg"
import { Navbar, Nav, Form, FormControl, Button, Card } from "react-bootstrap";
import LogoutButton from "./LogoutButton";
import axios from 'axios';
import Callback from '../Components/Callback';



export const Profile = () => {
    const { user, isAuthenticated, loginWithRedirect} = useAuth0();
    return (
        <div>
            {!isAuthenticated && (
                <div class="row">
                    <div class="col-sm-5">
                        <div id="text-reporte">
                            <h5>En este sistema podrás realizar reportes de agua. Además podrás consultar más información acerca de esta dependencia.</h5>
                            <h6>Para ingresar, da clic en el siguiente botón:</h6>
                            <button type="button" class="btn btn-outline-secondary" onClick={() => loginWithRedirect()}>
                                Log In / Sign Up
                            </button>
                        </div>
                    </div>
                    <div class="col-sm-7">
                    <Card id="card" className="text-center">
                        <Card.Body>
                            <Card.Text>
                                <h2 className="bienvenido">Bienvenido al Sistema de Reportes de Agua de la CDMX</h2>
                            </Card.Text>
                        </Card.Body>
                        <Card.Img variant="bottom" id="imagen_cuidate"src={Cuidate}/>
                    </Card>
                    </div>
                </div>
            )}
            {isAuthenticated && (
                <div>
                    <br></br>
                    <div class="container">
                        <div class="row" id="reporte-dentro-signin">
                            <div class="col-md-2" id="bienvenida-foto">
                                <img src={user.picture} alt={user.name}/>
                            </div>
                            <div class="col-md-3" id="bienvenida-nombre">
                                <div class="row" id="bienvenido">
                                    <h2>Bienvenido, </h2>
                                </div>
                                <div class="row" id="nombree">
                                    <h1>{user.given_name}</h1>
                                </div>
                                <div class="row" id="logout-dentro">
                                    <h6>Para cerrar sesión, da clic en el siguiente botón</h6>
                                    <LogoutButton />
                                </div>
                            </div>
                            <div class="col-md-7">
                                <h2>Con tu asistente virtual puedes realizar las siguientes funcionalidades: </h2>
                                <ul class="list-group">
                                    <li class="list-group-item"><h5>1. Realiza tu reporte</h5></li>
                                        <li class="list-group-item"><h5>2. Obten información sobre esta dependencia</h5></li>
                                        <li class="list-group-item"><h5>3. Ir a la liga de pago</h5></li>
                                        <li class="list-group-item"><h5>4. Información sobre COVID-19</h5></li>
                                        <li class="list-group-item"><h5>5. ¡Descubre más conversando con él!</h5></li>
                                    </ul>
                            </div>
                        </div>
                    </div>
                    
                    <WidgetFA />
                </div> 
            )   }
        </div>
    )
}
export default Profile