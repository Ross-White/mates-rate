import React, { useState } from "react";
import { useParams } from "react-router";
import { useQuery, useMutation } from "@apollo/client";

const TripCost = () => {
  const [formState, setFormState] = useState({
    description: "",
    amount: "",
  });

  const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const amount = formState.amount;
        const description = formState.description;
    }


  return (
    <div>
      <h1>Add costs for trip</h1>
      <form>
        <label>Amount</label>
        <input placeholder="£" value={formState.amount} name="amount" onChange={handleChange}></input>
        <label>Dexcription</label>
        <input value={formState.description} name="description" onChange={handleChange}></input>
      </form>
    </div>
  );
};

export default TripCost;
