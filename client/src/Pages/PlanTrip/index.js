import React, { useState } from "react";

function GuestList({ guest }) {
  return <div className="guest">{guest.email}</div>;
}

function GuestListForm({ addGuest }) {
  const [value, setValue] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addGuest(value);
    setValue("");
  };

  return (
    <form>
      <label className="mb-2 tracking-wide font-bold text-lg text-gray-800">
        Invite guest via email
      </label>
      <input
        type="email"
        className="border py-2 px-3 text-grey-darkest md:mr-2"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <button onClick={handleSubmit}>Add guest</button>
    </form>
  );
}

const PlanTrip = () => {
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [organiser, setOrganiser] = useState("");

  const [guests, setGuests] = useState([{ email: "oli@gmail.com" }]);

  const handleSubmit = (e) => {
    e.preventDefault();
    //sns..
  };

  const addGuest = email => {
    const newGuests = [...guests, { email }];
    setGuests(newGuests);
  };

  return (
    <div className="flex items-center h-screen w-full bg-green-50">
      <div className="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
        <h2 className="block w-full text-center text-gray-900 mb-6">
          Plan new trip
        </h2>
        <form
          onSubmit={handleSubmit}
          className="mb-4 md:flex md:flex-wrap md:justify-between"
        >
          <div className="flex flex-col mb-4 md:w1/2">
            <label className="mb-2 tracking-wide font-bold text-lg text-gray-800">
              Destination
            </label>
            <input
              value={destination}
              type="text"
              name="destination"
              id="destination"
              onChange={(e) => setDestination(e.target.value)}
              className="border py-2 px-3 text-grey-darkest md:mr-2"
            />
          </div>

          <div className="flex flex-col mb-4 md:w1/2">
            <label className="mb-2 tracking-wide font-bold text-lg text-gray-800">
              Start date
            </label>
            <input
              value={startDate}
              type="date"
              name="start"
              id="start"
              onChange={(e) => setStartDate(e.target.value)}
              className="border py-2 px-3 text-grey-darkest md:mr-2"
            />
          </div>

          <div className="flex flex-col mb-4 md:w1/2">
            <label className="mb-2 tracking-wide font-bold text-lg text-gray-800">
              Organiser
            </label>
            <input
              value={organiser}
              type="text"
              name="organiser"
              id="organiser"
              onChange={(e) => setOrganiser(e.target.value)}
              className="border py-2 px-3 text-grey-darkest md:mr-2"
            />
          </div>
        </form>
        <GuestListForm addGuest={addGuest} />

        <div className="guestList">
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
      </div>
    </div>
  );
};

export default PlanTrip;
