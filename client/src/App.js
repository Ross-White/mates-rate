import "./App.css";
import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from "./Pages/LogIn";
import Signup from "./Pages/SignUp";
import Header from "./components/Header";
import Home from "./Pages/Home";
import PlanTrip from "./Pages/planTrip";
import TripList from "./Pages/TripList/index";
import SingleTrip from "./Pages/SingleTrip";

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Header />
        <div className="mx-6 my-4 grid md:grid-cols-4 lg:grid-cols-6">
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route path="/plantrip">
            <PlanTrip />
          </Route>
          <Route path="/triplist">
            <TripList />
          </Route>
          <Route exact path="/trips/:tripId">
              <SingleTrip />
          </Route>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
