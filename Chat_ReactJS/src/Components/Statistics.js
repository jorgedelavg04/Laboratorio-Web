import React, { useEffect, useState, useCallback }  from 'react'
import { useAuth0, withAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import WidgetFA from "./widget";
import Cuidate from "../Images/cuidate_cdmx.jpeg"
import { Navbar, Nav, Form, FormControl, Button, Card } from "react-bootstrap";
import LogoutButton from "./LogoutButton";
import axios from 'axios';
import {HorizontalBar, Doughnut} from 'react-chartjs-2';

class Statistics extends React.Component {
    state = {
        intents_used: "",
        number_widget: "",
        number_whats: "",
        number_reports: "",
        number_others: ""
    }
    
    componentDidMount() {
        axios.get(`http://127.0.0.1:5002/getStatistics`)
          .then(res => {
            const intents_used = res.data.intents_used;
            const number_whats = res.data.number_whats;
            const number_widget = res.data.number_widget;
            const number_reports = res.data.numero_reportes;
            const number_others = res.data.numero_otros;
            this.setState({ 
                intents_used,
                number_whats,
                number_widget,
                number_reports,
                number_others
            });
            console.log(res)
          })
          
    }

    
    render() {
        const keys = Object.keys(this.state.intents_used)
        const values = Object.values(this.state.intents_used)

        return (
            <div className="container">
                <div className="row mb-30">
                    <div id="top_e" className="col-sm-12 col-lg-12 col-xl-7">
                        <h2 className="top_experiencias">Estadística</h2>
                    </div>
                </div>
                <div className="row mb-30">
                    <div id="top_e" className="col-sm-6 col-lg-6 col-xl-6 ">
                        <h5 className="top_experiencias">% Conversaciones por Whats App y Widget</h5>
                        <Doughnut 
                            data={
                                {
                                    labels:["Whats App", "Widget"],
                                    datasets: [
                                    {
                                        label: 'Intents',
                                        backgroundColor: [
                                            'rgba(39,139,28,0.91)',
                                            '#001724',
                                        ],
                                        hoverBackgroundColor: [
                                            'rgba(39,139,28,0.61)',
                                            '#455A64'
                                        ],
                                        data: [this.state.number_whats, this.state.number_widget],
                                        
                                    }
                                    ]
                                }
                            }
                            
                        />
                    </div>
                    <div id="top_e" className="col-sm-6 col-lg-6 col-xl-6">
                        <h5 className="top_experiencias">Numero de reportes</h5>
                        <Doughnut 
                            data={
                                {
                                    labels:["Total Reportes", "Otras experiencias"],
                                    datasets: [
                                    {
                                        label: 'Intents',
                                        backgroundColor: [
                                            'rgba(39,139,28,0.91)',
                                            '#001724',
                                        ],
                                        hoverBackgroundColor: [
                                            'rgba(39,139,28,0.61)',
                                            '#455A64'
                                        ],
                                        data: [this.state.number_reports, this.state.number_others],
                                        
                                    }
                                    ]
                                }
                            }
                            
                        />
                    </div>
                </div>
                <div id="last_bar" className="row mb-30">
                    <div id="top_e" className="col-sm-12 col-lg-12 col-xl-7">
                        <h5 className="top_experiencias">Top {keys.length} de Experiencias</h5>
                        <HorizontalBar 
                            width={100}
                            height={60}
                            data={
                                {
                                    labels: keys,
                                    datasets: [
                                    {
                                        label: 'Intents',
                                        backgroundColor: 'rgba(39,139,28,0.91)',
                                        borderColor: 'rgba(15,55,11,0.91)',
                                        borderWidth: 2,
                                        hoverBackgroundColor: 'rgba(39,139,28,0.4)',
                                        hoverBorderColor: 'rgba(5,55,11,0.37)',
                                        data: values
                                    }
                                    ]
                                }
                            }

                            options={{
                                scales: {
                                xAxes: [{
                                    ticks: {
                                    beginAtZero:true,
                                    min: 0,
                                    // stepSize: 1,
                                    }
                                }]
                                }
                            }}   
                        />
                    </div>
                </div>
            </div>
        )
    }
}
export default Statistics
