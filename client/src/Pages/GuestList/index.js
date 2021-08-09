import React from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_TRIP } from '../../utils/queries';

const GuestList = () => {
    const { tripId } = useParams();
    const { loading, data } = useQuery(QUERY_SINGLE_TRIP, {
        variables: { tripId: tripId },
    });

    const trip = data?.trip || [];
    console.log(trip.guests);
    return (
        <div>
            <h1>{trip.destination}</h1>

        </div>
        
    );
};

export default GuestList;