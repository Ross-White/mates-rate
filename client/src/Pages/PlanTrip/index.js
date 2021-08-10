import React, { useState } from "react";

const PlanTrip = () => {
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [organiser, setOrganiser] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    //sns..
  };

  return (
    <div className="flex items-center h-screen w-full bg-green-50">
      <div className="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
        <h2 className="block w-full text-center text-gray-900 mb-6">
          Plan new trip
        </h2>
        <form onSubmit={handleSubmit} className="mb-4 md:flex md:flex-wrap md:justify-between">
          <div className="flex flex-col mb-4 md:w1/2">
            <label className="mb-2 tracking-wide font-bold text-lg text-gray-800">Destination</label>
            <input
              value={destination}
              type="text"
              name="destination"
              id="destination"
              onChange={(e) => setDestination(e.target.value)}
              className="border py-2 px-3 text-grey-darkest md:mr-2"/>
          </div>

          <div className="flex flex-col mb-4 md:w1/2">
            <label className="mb-2 tracking-wide font-bold text-lg text-gray-800">Start date</label>
            <input
              value={destination}
              type="date"
              name="start"
              id="start"
              onChange={(e) => setStartDate(e.target.value)}
              className="border py-2 px-3 text-grey-darkest md:mr-2"/>
          </div>
          
          
          <div className="flex flex-col mb-4 md:w1/2">
            <label className="mb-2 tracking-wide font-bold text-lg text-gray-800">Organiser</label>
            <input
              value={destination}
              type="text"
              name="organiser"
              id="organiser"
              onChange={(e) => setOrganiser(e.target.value)}
              className="border py-2 px-3 text-grey-darkest md:mr-2"/>
          </div>

          <button class="block bg-green-500 hover:bg-green-400 text-white uppercase text-lg mx-auto p-4 rounded" type="submit">Create Trip</button>

        </form>
      </div>
    </div>
  );
};

export default PlanTrip;
