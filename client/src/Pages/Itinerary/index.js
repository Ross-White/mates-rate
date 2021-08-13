import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_SINGLE_TRIP } from '../../utils/queries';
import { ADD_ACTIVITY } from '../../utils/mutations';
import Auth from "./../../utils/auth";

const Itinerary = () => {
    const { tripId } = useParams();

    const { loading, data } = useQuery(QUERY_SINGLE_TRIP, {
        variables: { tripId: tripId },
    });

    const trip = data?.trip || [];
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


    return (
        <div>
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
                    <form onSubmit={handleFormSubmit}>
                        <input
                            onChange={handleChange}
                            name="date"
                            placeholder="date"
                            value={formState.date} />
                        <input
                            onChange={handleChange}
                            name="activity"
                            placeholder="activity"
                            value={formState.activity} />
                        <button type="submit">Add Activity</button>
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