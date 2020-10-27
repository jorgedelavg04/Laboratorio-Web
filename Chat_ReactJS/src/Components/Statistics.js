import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import WidgetFA from "./widget";
import Cuidate from "../Images/cuidate_cdmx.jpeg"
import { Navbar, Nav, Form, FormControl, Button, Card } from "react-bootstrap";
import LogoutButton from "./LogoutButton";
export const Statistics = () => {
    const { user, isAuthenticated, loginWithRedirect} = useAuth0();
    
    return (
        <div>
            {!isAuthenticated && (
                <div class="row">
                    Aqui es
                </div>
            )}
        {isAuthenticated && (
            <div>
                <br></br>
                <div class="container">
                    <div class="row" id="reporte-dentro-signin">
                        Aqui es
                    </div>
                </div>
                
                <WidgetFA />
            </div> 
        )}
        </div>
    )
}
export default Statistics