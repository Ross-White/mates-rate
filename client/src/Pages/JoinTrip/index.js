import React, { useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import Auth from '../../utils/auth';
import { QUERY_SINGLE_TRIP } from '../../utils/queries';
import { ADD_USER_TO_TRIP } from '../../utils/mutations';



const JoinTrip = () => {
    const [formState, setFormState] = useState({ tripId: '' });
    const [getTrip, { loading, data }] = useLazyQuery(QUERY_SINGLE_TRIP);
    const trip = data?.trip || [];

    const [addUserToTrip] = useMutation(ADD_USER_TO_TRIP);


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({ [name]: value });
    };
    // const tripId = formState.tripId;


    const HandleSearchTrip = async (event) => {
        event.preventDefault();
        getTrip({ variables: { tripId: formState.tripId } });
    };

    const addToTrip = (event) => {
        event.preventDefault();
        console.log("Click Worked!!!", event.target.value);
        addUserToTrip({
            variables: {  
                "addUserToTripTripId": event.target.value,
                "addUserToTripGuests": Auth.getProfile().data._id
          }
        })
    };


    return (
        <div>
            {Auth.loggedIn() ? (
                <>
                    <form onSubmit={HandleSearchTrip}>
                        <input
                            className="form-input mb-4 border-2 w-full rounded-md h-10"
                            onChange={handleChange}
                            aria-label="tripId"
                            name="tripId"
                            placeholder="Enter Trip ID"
                            value={formState.tripId}>
                        </input>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline btn btn-block btn-info"
                        >Search</button>
                    </form>
                    <div className={trip.length === 0 ? 'invisible' : 'visible'}>
                        <section className="m-4 h-16" >
                            <div className="rounded-full flex flex-row justify-between content-center p-4 bg-gray-200" key={trip._id}>
                                <h4 className="">{trip.destination}</h4>
                                <h4 className="">{trip.startDate}</h4>
                            </div>
                        </section>
                        <button
                            onClick={addToTrip}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline btn btn-block btn-info"
                            value={trip._id}
                        >
                            Click to join trip
                        </button>
                    </div>
                </>

            ) : (
                <h1 className="block w-full text-center text-gray-900 mb-6">
                    You must log in first
                </h1>
            )}
        </div>
    )
}

export default JoinTrip;
