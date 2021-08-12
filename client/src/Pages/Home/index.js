import React from "react";
import { Link } from "react-router-dom";

import Auth from "./../../utils/auth";

const Home = () => {
  return (
    <div>
      {Auth.loggedIn() ? (
        <>
          <h1 className="block w-full text-center md:text-left text-green-400 my-6 text-5xl">
            Welcome {Auth.getProfile().data.email}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link className="rounded p-4 py-10 text-center shadow bg-blue-600 text-blue-50 text-2xl hover:bg-blue-500 hover:text-blue-100" to="/plantrip">Create new trip...</Link>
            <Link className="rounded p-4 py-10 text-center shadow bg-blue-600 text-blue-50 text-2xl hover:bg-blue-500 hover:text-blue-100" to="/triplist">View Trips...</Link>
          </div>
        </>
      ) : (
        <h1 className="block w-full text-center text-gray-900 mb-6">
          You must log in first
        </h1>
      )}
    </div>
  );
};

export default Home;
