import React, { useState } from 'react'

const PlanTrip = () => {
    const [tripName, setTripName] = useState("");

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
                    <label>Trip name</label>
                    <input value={tripName} type="text" onChange={e => setTripName(e.target.value)} className="border mx-2"></input>
                    <input type="submit" value="Submit" />
                </div>
                
            </form>
        </>
    )
}

export default PlanTrip
