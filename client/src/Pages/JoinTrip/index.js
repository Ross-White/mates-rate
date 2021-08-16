import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import Auth from '../../utils/auth';
import { useFormState } from 'react-hook-form';



const JoinTrip = () => {
    const [tripId, setTripId] = useState('');
    const handleChange = (event) => {
        const { name, value } = event.target;
        setTripId({[name]: value});
    };
    console.log("TRIP ID", tripId);
    

    return (
        <div>
            {Auth.loggedIn() ? (
                <>
                    <form>
                        <input
                            className="form-input mb-4 border-2 w-full rounded-md h-10"
                            onChange={handleChange}
                            aria-label="tripId"
                            name="tripId"
                            placeholder="Enter Trip ID">
                        </input>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline btn btn-block btn-info"
                        >Search</button>
                    </form>
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
