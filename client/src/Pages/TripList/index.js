import { useQuery } from '@apollo/client';
import React from 'react';
import { QUERY_USER_TRIPS } from '../../utils/queries';
import { Link } from 'react-router-dom';


const TripList = () => {
    const { loading, data } = useQuery(QUERY_USER_TRIPS)
    const user = data;
    if (loading) {
        return <div>Loading...</div>;
    }
    if (!user) {
        console.log("no data found")
    }
    const trips = user.userTrips.trips;


    return (
        <div>
            {trips &&
            trips.map((trip) => (
                <section className="m-4 h-16" >
                    <div className="rounded-full flex flex-row justify-between content-center p-4 bg-gray-200" key={trip._id}>
                        <h4 className="">{trip.destination}</h4>

                        <h4 className="">{trip.startDate}</h4>

                        <Link
                            className=""
                            >
                        View
                        </ Link>
                    </div>
                </section>
            ))}
        </div>
        
    );
};

export default TripList;