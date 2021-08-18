import React, { useState } from "react";
import { LOGIN_USER } from "../../utils/mutations";
import { Link } from 'react-router-dom';
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
          console.error(e)
      }

      setFormState({
          email: '',
          password: '',
      })
  };

  return (
    <main className="flex justify-center min-h-screen">
    <div className="w-full max-w-xs">
      <div className="">
        <div className="card-body">
          {data ? (
            <p>
              Success! You may now head{' '}
              <Link to="/">back to the homepage.</Link>
            </p>
          ) : (
            <form 
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
              onSubmit={handleFormSubmit}>
              <input
                className="form-input mb-4 border-2 w-full rounded-md h-10"
                placeholder="Your email"
                name="email"
                type="email"
                value={formState.email}
                onChange={handleChange}
              />
              <input
                className="form-input mb-4 border-2 w-full rounded-md h-10"
                placeholder="******"
                name="password"
                type="password"
                value={formState.password}
                onChange={handleChange}
              />
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline btn btn-block btn-info"
                style={{ cursor: 'pointer' }}
                type="submit"
              >
                Submit
              </button>
            </form>
          )}

          {error && (
            <div className="my-3 p-3 bg-danger text-white">
              {error.message}
            </div>
          )}
        </div>
      </div>
    </div>
  </main>
  );
}
