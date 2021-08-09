import React from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_TRIP } from '../../utils/queries';

const Itinerary = () => {
    const { tripId } = useParams();
    console.log(tripId);
    const { loading, data } = useQuery(QUERY_SINGLE_TRIP, {
        variables: { tripId: tripId },
    });

    const trip = data?.trip || [];

    return (
        <div>
            <h1>Hello</h1>
        </div>
        
    );
};

export default Itinerary;