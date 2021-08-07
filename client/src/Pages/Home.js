import React from 'react'
import { Link } from 'react-router-dom';

import Auth from '.././utils/auth'

const Home = () => {
    return (
        <div>
            {Auth.loggedIn() ? (
                <>
                <h1>You are now logged in</h1>
                <Link to="/plantrip">
                    Create new trip
                </Link>
                </>
            ) : (
                <h1>You must log in first</h1>
            )}
            
        </div>
    )
}

export default Home
