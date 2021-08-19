import React, { useState } from "react";
import { LOGIN_USER } from "../../utils/mutations";
import { Link } from "react-router-dom";
import Auth from "./../../utils/auth";
import { useMutation } from "@apollo/client";

export default function SignIn() {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    setFormState({
      email: "",
      password: "",
    });
  };

  return (
    <main className="flex h-screen w-full">
      {data ? (
        <p></p>
      ) : (
        <div className="w-full bg-white h-48 rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
          
          <form
            className="mb-4 md:flex md:flex-wrap md:justify-between"
            onSubmit={handleFormSubmit}
          >
            <input
              className="mb-4 border-2 rounded-md h-10 w-full"
              placeholder="Your email"
              name="email"
              type="email"
              value={formState.email}
              onChange={handleChange}
            />
            <input
              className="mb-4 border-2 rounded-md h-10 w-full"
              placeholder="******"
              name="password"
              type="password"
              value={formState.password}
              onChange={handleChange}
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline btn btn-block btn-info"
              style={{ cursor: "pointer" }}
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      )}

      {error && (
        <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
      )}
    </main>
  );
}
