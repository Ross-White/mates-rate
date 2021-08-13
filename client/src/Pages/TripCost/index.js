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
  };

  return (
    <div>
      <h1>Add costs for trip</h1>
      <form>
        <label>Amount</label>
        <input
          placeholder="£"
          value={formState.amount}
          name="amount"
          onChange={handleChange}
        ></input>
        <label>Dexcription</label>
        <input
          value={formState.description}
          name="description"
          onChange={handleChange}
        ></input>
      </form>
    </div>
  );
};

export default TripCost;
