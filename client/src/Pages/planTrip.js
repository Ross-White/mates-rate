import React from 'react'

const planTrip = () => {
    return (
        <>
            <div className="col-span-full inline-flex justify-center rounded border shadow">
                <h2>Plan new trip</h2>
            </div>
            <form className="col-span-full my-2 inline-flex justify-center">
                <div className="flex">
                    <label>Trip name</label>
                    <input className="border mx-2"></input>
                </div>
            </form>
        </>
    )
}

export default planTrip
