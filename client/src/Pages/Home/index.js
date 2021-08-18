import React from "react";
import { Link } from "react-router-dom";
import { FaUserFriends } from "react-icons/fa";
import { RiMoneyPoundCircleFill } from "react-icons/ri";

import Auth from "./../../utils/auth";




const Home = () => {
  return (
    <div className="m-3 w-auto min-h-screen">
      {Auth.loggedIn() ? (
        <>
          <h1 className="block w-full text-center md:text-left text-green-400 py-6 my-0 text-5xl">
            Welcome, {Auth.getProfile().data.name}
          </h1>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link className="rounded-full p-4 py-10 text-center shadow bg-blue-600 text-blue-50 text-2xl hover:bg-blue-500 hover:text-blue-100" to="/plantrip">Create new trip...</Link>
            <Link className="rounded-full p-4 py-10 text-center shadow bg-blue-600 text-blue-50 text-2xl hover:bg-blue-500 hover:text-blue-100" to="/triplist">View Trips...</Link>
            <Link className="rounded-full p-4 py-10 text-center shadow bg-blue-600 text-blue-50 text-2xl hover:bg-blue-500 hover:text-blue-100" to="/jointrip">Join Trip</Link>
          </div>
        </>
      ) : (
        <div className="flex flex-wrap gap-6">
          <div className="flex-initial inline-flex items-center h-48 w-full bg-blue-50 rounded-lg shadow">
            <FaUserFriends className="text-blue-500 flex-initial" size="md"/>
            <h3 className="text-blue-500 text-center text-3xl">Plan your trip and invite friends... </h3>
          </div>

          <div className="flex-initial inline-flex items-center h-48 w-full bg-blue-50 rounded-lg shadow">
            <h3 className="text-blue-500 text-center text-3xl">Take the hassel out of splitting the total trip cost</h3>
            <RiMoneyPoundCircleFill className="text-blue-500 flex-initial" size="md"/>
          </div>
        </div>
        
      )}
    </div>
  );
};

export default Home;

