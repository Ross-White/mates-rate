import React from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_TRIP } from '../../utils/queries';
import Auth from "./../../utils/auth";

const GuestList = () => {
    const { tripId } = useParams();
    const { loading, data } = useQuery(QUERY_SINGLE_TRIP, {
        variables: { tripId: tripId },
    });
    console.log(data)
    const guests = data.trip.guests || [];
    return (
        <div>
            {guests &&
                guests.map((guest) => (
                    <section className="m-4 h-16" >
                        <div className="border-2 shadow-md rounded-full flex flex-row justify-between content-center p-4 bg-gray-200" key={guest._id}>
                            <h4 className="">{guest.name}</h4>
                        </div>
                    </section>
                ))}
            {/* <section className="m-4 h-16" >
                <div className="border-2 shadow-md rounded-full flex flex-row justify-between content-center p-4 bg-gray-200" key={data.trip.organiser}>
                    <h4 className="">Organiser: {data.trip.organiser}</h4>
                </div>
            </section> */}
        </div>

    );
};

export default GuestList;