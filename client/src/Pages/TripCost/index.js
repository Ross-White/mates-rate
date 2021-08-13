import React, { useState } from "react";
import { useParams } from "react-router";
import { useQuery, useMutation } from "@apollo/client";
import { ADD_TRIPCOST } from "../../utils/mutations";
import { QUERY_SINGLE_TRIP } from "../../utils/queries";
import { useEffect } from "react";

const TripCost = () => {
  const { tripId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_TRIP, {
      variables: { tripId: tripId },
  });

  const trip = data?.trip || [];
  const costs = trip.costs;

  const [formState, setFormState] = useState({
    amount: 0,
    description: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const [addTripCost] = useMutation(ADD_TRIPCOST)

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { amount, description } = formState;

    try {
        const { data } = await addTripCost({
            variables: {
                tripId: tripId,
                // amount: formState.amount,
                description: formState.description
            }
        })

        setFormState({
          amount: 0,
          description: "",
        })
    } catch (err) {
        console.log(err)
    }

  };

  return (
    <div>
      <h1>Add costs for trip</h1>
      <form onSubmit={handleFormSubmit}>
        <label>Amount</label>
        <input
          placeholder={0}
          value={formState.amount}
          name="amount"
          type="number"
          onChange={handleChange}
        ></input>
        <label>Description</label>
        <input
          value={formState.description}
          name="description"
          onChange={handleChange}
        ></input>
        <button type="submit">Add Cost</button>
      </form>
      {costs && 
        costs.map((cost, index) => (
            <h4 key={index}>{cost.description}</h4>
        ))}
    </div>
  );
};

export default TripCost;
