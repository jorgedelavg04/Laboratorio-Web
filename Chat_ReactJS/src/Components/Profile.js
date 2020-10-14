import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';

export const Profile = () => {
    const { user, isAuthenticated } = useAuth0();
    return (
        isAuthenticated && (
            <div>
                <br></br>
                <div class="row">
                    <div class="col-md-1">
                        <img src={user.picture} alt={user.name}/>
                    </div>
                    <div class="col-md-1">
                        <h2>Bienvenido,</h2>
                    </div>
                    <div class="col-md-1">
                        <h2>&ensp; {user.given_name}</h2>
                    </div>
                </div>
            </div>
        )
    )
}
export default Profile