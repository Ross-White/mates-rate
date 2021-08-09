import React, { useState } from "react";

const PlanTrip = () => {
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [itinerary, setItinerary] = useState([]);
  const [organiser, setOrganiser] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    //sns..
  };

  return (
    <div className="h-screen flex-col bg-gray-50">
      <div className="bg-white rounded-lg border shadow py-10 px-16">
        <h2 className="text-center mb-10 text-gray-500 font-black text-4xl">
          Plan new trip
        </h2>
        <form onSubmit={handleSubmit} className="">
          <label>Destination</label>
          <input
            value={destination}
            type="text"
            onChange={(e) => setDestination(e.target.value)}
            className="border py-1 mx-2 rounded"
          ></input>
          <label>Start date</label>
          <input
            value={startDate}
            type="text"
            onChange={(e) => setStartDate(e.target.value)}
            className="border py-1 mx-2 rounded"
          ></input>
          <label>Organiser</label>
          <input
            value={organiser}
            type="text"
            onChange={(e) => setOrganiser(e.target.value)}
            className="border py-1 mx-2 rounded"
          ></input>
          <button
                            className={`bg-green-500 py-2 px-4 text-sm text-white rounded border border-green-50 focus:outline-none focus:border-green-900`}
                        >
                            Submit
                        </button>
        </form>
      </div>
    </div>
  );
};

export default PlanTrip;
