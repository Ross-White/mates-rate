import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_SINGLE_TRIP } from '../../utils/queries';
import { ADD_ACTIVITY } from '../../utils/mutations';

import Auth from '../../utils/auth';


const Itinerary = () => {
    const { tripId } = useParams();

    const { loading, data } = useQuery(QUERY_SINGLE_TRIP, {
        variables: { tripId: tripId },
    });

    const trip = data?.trip || [];
    console.log(trip);
    const activities = trip.itinerary;
    const [formState, setFormState] = useState({
        date: "",
        activity: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };
    console.log("FormState:::", formState)

    const [addActivity] = useMutation(ADD_ACTIVITY);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const { date, activity } = formState;
        try {
            const { data } = await addActivity({
                variables: {
                    "addActivityTripId": tripId,
                    "addActivityDate": date,
                    "addActivityActivity": activity
                }
            });

        } catch (err) {
            console.error(err)
        }
        console.log("NewActivity:::", data);

    };

    if (!activities.length && trip.organiser !== Auth.getProfile().data._id) {
        return (
            <div>
                <h1>There are no activities planned yet</h1>
            </div>
        )
    }

    return (
        <div className="min-h-screen mx-auto container">

            {Auth.loggedIn() ? (
                <>
                    <h1>{trip.destination}</h1>
                    {activities &&
                        activities.map((activity) => (
                            <section className="m-4 h-16" >
                                <div className="rounded-full flex flex-row justify-between content-center p-4 bg-gray-200" key={activity._id}>
                                    <h4 className="">{activity.activity}</h4>

                                    <h4 className="">{activity.date}</h4>
                                </div>
                            </section>
                        ))}
                    <form
                        className={trip.organiser === Auth.getProfile().data._id ? 'bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 visible' : 'invisible'}
                        onSubmit={handleFormSubmit}>
                        <input
                            className="form-input mb-4 border-2 w-full rounded-md h-10"
                            onChange={handleChange}
                            name="date"
                            placeholder="date"
                            value={formState.date} />
                        <input
                            className="form-input mb-4 border-2 w-full rounded-md h-10"
                            onChange={handleChange}
                            name="activity"
                            placeholder="activity"
                            value={formState.activity} />
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline btn btn-block btn-info"
                        >Add Activity</button>
                    </form>
                </>
            ) : (
                <h1 className="block w-full text-center text-gray-900 mb-6">
                    You must log in first
                </h1>
            )}
        </div>

    );
};

export default Itinerary;