import React from "react";
import { Link } from "react-router-dom";
import { FaUserFriends } from "react-icons/fa";
import { RiMoneyPoundCircleFill } from "react-icons/ri";
import { BiMessageCheck } from "react-icons/bi";

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
            <Link
              className="rounded-full p-4 py-10 text-center shadow bg-blue-600 text-blue-50 text-2xl hover:bg-blue-500 hover:text-blue-100"
              to="/plantrip"
            >
              Create new trip...
            </Link>
            <Link
              className="rounded-full p-4 py-10 text-center shadow bg-blue-600 text-blue-50 text-2xl hover:bg-blue-500 hover:text-blue-100"
              to="/triplist"
            >
              View Trips...
            </Link>
            <Link
              className="rounded-full p-4 py-10 text-center shadow bg-blue-600 text-blue-50 text-2xl hover:bg-blue-500 hover:text-blue-100"
              to="/jointrip"
            >
              Join Trip
            </Link>
          </div>
        </>
      ) : (
        <div className="flex flex-wrap gap-6">


          <div className="md:hidden inline-flex justify-evenly w-full bg-blue-50 rounded-lg shadow">
            <Link
              to="/signup"
              className="mx-2 text-blue-500 text-center text-3xl"
            >
              Sign up
            </Link>
            <Link
              to="/login"
              className="mx-2 text-blue-500 text-center text-3xl"
            >
              Login
            </Link>
          </div>

          <div className="flex-initial inline-flex items-center w-full bg-blue-600 rounded-lg shadow p-2">
            <h3 className="text-4xl md:text-5xl mx-4 text-blue-50 text-center">Take the hassel out of planning those big group trips</h3>
          </div>

          <div className="flex-initial inline-flex items-center h-48 w-full bg-blue-50 rounded-lg shadow">
            <div className="flex-0 h-48">
              <FaUserFriends className="mx-1 text-blue-500" size="md" />
            </div>
            <h3 className="text-blue-500 text-center text-3xl">
              Plan your trip and invite friends
            </h3>
          </div>

          <div className="flex-initial inline-flex items-center h-48 w-full bg-blue-50 rounded-lg shadow">
            <h3 className="mx-2 text-blue-500 text-center text-3xl">
              Track spending and split the final cost
            </h3>
            <div className="flex-0 h-48">
              <RiMoneyPoundCircleFill className="text-blue-500" size="md" />
            </div>
          </div>

          <div className="inline-flex items-center h-48 w-full bg-blue-50 rounded-lg shadow">
            <div className="flex-0 h-48">
              <BiMessageCheck className="text-blue-500" size="md" />
            </div>
            <h3 className="ml-8 text-blue-500 text-center text-3xl">
              Send messages to your group
            </h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
