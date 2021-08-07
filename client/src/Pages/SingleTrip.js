import { useQuery } from '@apollo/client';
import React from 'react';
import { Link } from 'react-router-dom';

const SingleTrip = () => {
    const { loading, data } = useQuery()
    const trips = data?.trips || [];

    return (
        <div>

        </div>
    );
};

export default SingleTrip;