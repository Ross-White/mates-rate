import React, { useState } from "react";
import { useParams } from "react-router";
import { useQuery, useMutation } from "@apollo/client";
import { ADD_TRIPCOST } from "../../utils/mutations";
import { QUERY_SINGLE_TRIP } from "../../utils/queries";
import Auth from '../../utils/auth';


const TripCost = () => {
  const { tripId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_TRIP, {
    variables: { tripId: tripId },
  });

  const trip = data?.trip || [];
  const costs = trip.costs;

  const [formState, setFormState] = useState({
    amount: '',
    description: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
    console.log("FormState:::", formState);

  };

  const [addTripCost] = useMutation(ADD_TRIPCOST);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const { amount, description } = formState;
    try {
      const { data } = await addTripCost({
        variables: {
          "addTripCostTripId": tripId,
          "addTripCostAmount": amount,
          "addTripCostDescription": description
        }
      })


    } catch (err) {
      console.log(err)
    }
  };

  if (!costs.length && trip.organiser !== Auth.getProfile().data._id) {
    return (
      <div>
        <h1>No costs submitted for this trip yet</h1>
      </div>
    )
  }

  return (
    <div className="min-h-screen container mx-auto">

      {Auth.loggedIn() ? (
        <>
          <h1>Add costs for trip</h1>
          {costs &&
            costs.map((cost) => (
              <section className="m-4 h-16" >
                <div className="rounded-full flex flex-row justify-between content-center p-4 bg-gray-200" key={trip._id}>
                  <h4 >£{cost.amount}</h4>
                  <h4 >{cost.description}</h4>
                </div>
              </section>
            ))}
          <form
            onSubmit={handleFormSubmit}
            className={trip.organiser === Auth.getProfile().data._id ? 'bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 visible' : 'invisible'}
          >
            <input
              className="form-input mb-4 border-2 w-full rounded-md h-10"
              onChange={handleChange}
              name="amount"
              placeholder="amount"
              value={formState.amount} />
            <input
              className="form-input mb-4 border-2 w-full rounded-md h-10"
              onChange={handleChange}
              name="description"
              placeholder="description"
              value={formState.description} />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline btn btn-block btn-info"
            >Add Cost</button>
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

export default TripCost;
