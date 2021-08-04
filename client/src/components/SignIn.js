import React, { useState } from "react";
import { LOGIN_USER } from "../utils/mutations";
import { Link } from 'react-router-dom';
import Auth from "../utils/auth";
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
      console.log(formState);
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
    <main className="flex justify-center">
    <div className="">
      <div className="">
        <h4 className="p-2">Login</h4>
        <div className="card-body">
          {data ? (
            <p>
              Success! You may now head{' '}
              <Link to="/">back to the homepage.</Link>
            </p>
          ) : (
            <form onSubmit={handleFormSubmit}>
              <input
                className="form-input"
                placeholder="Your email"
                name="email"
                type="email"
                value={formState.email}
                onChange={handleChange}
              />
              <input
                className="form-input"
                placeholder="******"
                name="password"
                type="password"
                value={formState.password}
                onChange={handleChange}
              />
              <button
                className="btn btn-block btn-info"
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
