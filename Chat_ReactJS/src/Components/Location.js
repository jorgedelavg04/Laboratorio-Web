import React from 'react'
import Iframe from 'react-iframe'
export const Location = () => {
    
    return (
        <div className="container">
            <div>
                <br></br><br></br>
                <iframe id="serviceFrameSend" src="./location.html" width="1000" height="1000"  frameborder="0" />
            </div>
        </div>
    )
}
export default Location