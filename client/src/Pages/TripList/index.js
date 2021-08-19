import { useQuery } from '@apollo/client';
import React from 'react';
import { QUERY_USER_TRIPS } from '../../utils/queries';
import { Link } from 'react-router-dom';
import Auth from "./../../utils/auth";

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
    if (!trips.length) {
        return (
        <div>
            <h1>You don't have any trips yet</h1>
        </div>
        )
    }

    return (

        <div className="min-h-screen">
            {Auth.loggedIn() ? (
                <div>
                    {trips &&
                        trips.map((trip) => (
                            <Link to={`trips/${trip._id}`}>
                            <section className="m-4" >
                                <div className="inline-flex items-center w-full bg-blue-50 h-16 rounded-full shadow" key={trip._id}>
                                    <h4 className="p-8 text-5xl text-blue-500 font-black">{trip.destination}</h4>

                                    <h4 className="">{trip.startDate}</h4>
                                </div>
                            </section>
                            </Link>
                            
                        ))}
                </div>
            ) : (
                <h1 className="block w-full text-center text-gray-900 mb-6">
                    You must log in first
                </h1>
            )}
        </div>

    );
};

export default TripList;