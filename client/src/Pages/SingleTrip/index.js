import React from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';

import Auth from "./../../utils/auth";
import { QUERY_SINGLE_TRIP } from '../../utils/queries';

const SingleTrip = () => {
    const { tripId } = useParams();
    const { loading, data } = useQuery(QUERY_SINGLE_TRIP, {
        variables: { tripId: tripId },
    });

    const trip = data?.trip || [];

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto flex flex-col justify-center">
            {Auth.loggedIn() ? (
                <>
                    <div className="flex rounded-full bg-gray-200 w-full justify-center h-16 p-4 text-lg">
                        <h1>{trip.destination}</h1>
                    </div>
                    <div>
                        <div>
                            <div className="container grid grid-cols-2">
                                <div className="rounded-full w-full h-48 flex items-center justify-center my-4 mr-2 bg-gray-200">
                                    <Link to={`itinerary/${trip._id}`}>
                                        Itinerary
                                    </Link>
                                </div>
                                <div className="rounded-full w-full h-48 flex items-center justify-center my-4 ml-2 bg-gray-200">
                                    <Link to={`guestlist/${trip._id}`}>
                                        Guest List
                                    </Link>
                                </div>
                            </div>
                            <div className="rounded-full w-full h-60 flex items-center justify-center my-4 bg-gray-200">
                                <Link to={`costs/${trip._id}`}>
                                    Costs
                                </Link>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <h1 className="block w-full text-center text-gray-900 mb-6">
                    You must log in first
                </h1>
            )}
        </div>
    );
};

export default SingleTrip;