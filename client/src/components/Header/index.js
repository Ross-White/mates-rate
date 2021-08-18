import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
      <header className="bg-blue-50 text-blue-500 mb-0 py-4 flex align-middle">
          <div className="container flex md:justify-between justify-center">
              <div>
                  <Link className="text-blue-400" to="/">
                      <h1 className="mx-8 text-4xl font-black text-blue-500">Mates Rates</h1>
                  </Link>
              </div>
              <div>
                  {Auth.loggedIn() ? (
                      <button className="" onClick={logout}>
                          Logout
                      </button>
                  ) : (
                    <div className="hidden md:flex md:items-center">
                      <Link to="/login">
                          Login
                      </Link>
                      <Link className="rounded bg-yellow-500 p-2 mx-2 text-yellow-50 hover:text-red-600 hover:bg-yellow-400" to="/signup">
                          Sign Up
                      </Link>
                    </div>
                  )}
              </div>
          </div>
      </header>
  );
};

export default Header;
