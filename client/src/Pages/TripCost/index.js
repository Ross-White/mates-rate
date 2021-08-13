import React, { useState } from "react";
import { useParams } from "react-router";
import { useQuery, useMutation } from "@apollo/client";
import { ADD_TRIPCOST } from "../../utils/mutations";
import { QUERY_SINGLE_TRIP } from "../../utils/queries";

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

  return (
    <div>
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
      <form onSubmit={handleFormSubmit}>
        <input
          onChange={handleChange}
          name="amount"
          placeholder="amount"
          value={formState.amount} />
        <input
          onChange={handleChange}
          name="description"
          placeholder="description"
          value={formState.description} />
        <button type="submit">Add Cost</button>
      </form>
    </div>
  );
};

export default TripCost;
