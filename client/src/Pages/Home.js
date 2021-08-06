import React from 'react'

import Auth from '.././utils/auth'

const Home = () => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
            {Auth.loggedIn() ? (
                <>
                <div>
                    Logged in
                </div>
                <div>
                Logged in
                </div>
                <div>
                    Logged in
                </div>
                <div>
                Logged in
                </div>
                <div>
                    Logged in
                </div>
                <div>
                Logged in
                </div>
                <div>
                    Logged in
                </div>
                <div>
                Logged in
                </div>
                <div>
                    Logged in
                </div>
                <div>
                Logged in
                </div>
                </>
    
            ) : (
                <h1>You must log in first</h1>
            )}
            
        </div>
    )
}

export default Home
