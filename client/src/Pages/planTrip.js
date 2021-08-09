import React, { useState } from 'react'
import { useForm } from "react-hook-form"

const PlanTrip = () => {
    const [destination, setDestination] = useState("");
    const [startDate, setStartDate] = useState("");
    const [itinerary, setItinerary] = useState([]);
    const [organiser, setOrganiser] = useState("");
    const [guests, setGuests] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <>
            <div className="col-span-full inline-flex justify-center rounded border shadow">
                <h2>Plan new trip</h2>
            </div>
            <form onSubmit={handleSubmit} className="col-span-full my-2 inline-flex justify-center">
                <div className="flex">
                    <label>Destination</label>
                    <input value={destination} type="text" onChange={e => setDestination(e.target.value)} className="border mx-2"></input>
                    <input type="submit" value="Submit" />
                </div>
                
            </form>
        </>
    )
}

export default PlanTrip
