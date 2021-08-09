import React from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_TRIP } from '../../utils/queries';

const Itinerary = () => {
    const { tripId } = useParams();
    const { loading, data } = useQuery(QUERY_SINGLE_TRIP, {
        variables: { tripId: tripId },
    });

    const trip = data?.trip || [];
    console.log(trip.itinerary);
    const activities = trip.itinerary;

    return (
        <div>
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
        </div>
        
    );
};

export default Itinerary;