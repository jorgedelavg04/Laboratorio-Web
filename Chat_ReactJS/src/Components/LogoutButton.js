import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';


const LogoutButton = () => {
    const { logout, isAuthenticated } = useAuth0();
    return (
        isAuthenticated && (
            <button type="button" class="btn btn-outline-danger" onClick={() => logout({ returnTo: window.location.origin })}>
                Log out
            </button>
        )
    )
}

export default LogoutButton
