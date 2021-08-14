import React, { useState } from "react";
import axios from "axios";

import { ADD_TRIP } from "../../utils/mutations";
import { useMutation } from "@apollo/client";
import Auth from "../../utils/auth";

import GuestListForm from "../../components/GuestListForm";
import GuestList from "../../components/GuestList";

const PlanTrip = () => {
  const [formState, setFormState] = useState({
    destination: "",
    startDate: "",
    organiser: Auth.getProfile().data._id,
  });

  const [guests, setGuests] = useState(["oli@gmail.com"]);

  const [addTrip] = useMutation(ADD_TRIP);

  const createTopic = async (topicName) => {
    try {
      const result = await axios({
        method: "post",
        url: "https://fvagknn9al.execute-api.us-east-1.amazonaws.com/dev/topic",
        headers: {
          "x-api-key": "44bw70Hmoq6ayQ9NvOqY85YTyJ0AbPJL2FniQImB",
          "Content-Type": "application/json",
        },
        data: {
          topicName,
        },
      });
      console.log(result);

      return result.data.topicArn;
    } catch (err) {
      console.error(err);
    }
  };

  const createSub = async (topicARN, guest) => {
    try {
      const result = await axios({
        method: "post",
        url:
          "https://fvagknn9al.execute-api.us-east-1.amazonaws.com/dev/subscribe",
        headers: {
          "x-api-key": "44bw70Hmoq6ayQ9NvOqY85YTyJ0AbPJL2FniQImB",
          "Content-Type": "application/json",
        },
        data: {
          topicArn: topicARN,
          endpoints: [{ type: "email", value: guest }],
        },
      });
      console.log("create sub res:", result);

      return result;
    } catch (err) {
      console.error(err);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const topicArn = await createTopic(formState.destination);
    console.log('topicArn: ', topicArn);
    for (let i = 0; i <= guests.length; i++) {
      const guest = guests[i] 
      const subscription = await createSub(topicArn, guest);
      console.info("subscribed successfully: ", subscription);
    }

    addTrip({
      variables: {
        destination: formState.destination,
        organiser: Auth.getProfile().data._id
      },
    });
  };
  //subscribe: after createTopic, subscribeGuests using topicArn & endpoints (email / sms)
  //ideally add topicArn into database
  //   // google-libphonenumber for converting phone numbers to valid e.164 (international numbers - otherwise sms will not work!!!)

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const addGuest = (email) => {
    const newGuests = [...guests, email ];
    setGuests(newGuests);
  };

  return (
    <div className="flex items-center h-screen w-full bg-green-50">
            {Auth.loggedIn() ? (
        <>
      <div className="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
        <h2 className="block w-full text-center text-gray-900 mb-6">
          Plan new trip
        </h2>
        <form
          onSubmit={handleFormSubmit}
          className="mb-4 md:flex md:flex-wrap md:justify-between"
        >
          <div className="flex flex-col mb-4 md:w1/2">
            <label className="mb-2 tracking-wide font-bold text-lg text-gray-800">
              Destination
            </label>
            <input
              value={formState.destination}
              type="text"
              name="destination"
              id="destination"
              onChange={handleChange}
              className="border py-2 px-3 text-grey-darkest md:mr-2"
            />
          </div>

          <div className="flex flex-col mb-4 md:w1/2">
            <label className="mb-2 tracking-wide font-bold text-lg text-gray-800">
              Start date
            </label>
            <input
              value={formState.startDate}
              type="date"
              name="startDate"
              id="startDate"
              onChange={handleChange}
              className="border py-2 px-3 text-grey-darkest md:mr-2"
            />
          </div>

          {/* <div className="flex flex-col mb-4 md:w1/2">
            <label className="mb-2 tracking-wide font-bold text-lg text-gray-800">
              Organiser
            </label>
            <input
              value={formState.organiser}
              type="text"
              name="organiser"
              id="organiser"
              onChange={handleChange}
              className="border py-2 px-3 text-grey-darkest md:mr-2"
            />
          </div> */}

          <GuestListForm addGuest={addGuest} />

          <div className="flex flex-col mb-4 w-full">
            <h2 className="mb-2 tracking-wide font-bold text-lg text-gray-800">
              Guest List
            </h2>
            {guests.map((guest, index) => (
              <GuestList key={index} index={index} guest={guest} />
            ))}
          </div>

          <button
            className="block bg-green-500 hover:bg-green-400 text-white uppercase text-lg mx-auto p-4 rounded mt-4"
            type="submit"
          >
            Create Trip
          </button>
        </form>
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

export default PlanTrip;
