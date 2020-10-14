import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();
    return (
        !isAuthenticated && (
            <button type="button" class="btn btn-outline-info" onClick={() => loginWithRedirect()}>
                Log In
            </button>
        )
    )
}

export default LoginButton
