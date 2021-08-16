import "./assets/main.css";
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
import PlanTrip from "./Pages/PlanTrip";
import TripList from "./Pages/TripList";
import SingleTrip from "./Pages/SingleTrip";
import Itinerary from "./Pages/Itinerary";
import GuestList from "./Pages/GuestList";
import TripCost from "./Pages/TripCost";
import JoinTrip from "./Pages/JoinTrip";

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
        <div className="mx-6">
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
          <Route path="/jointrip">
            <JoinTrip />
          </Route>
          <Route exact path="/trips/:tripId">
              <SingleTrip />
          </Route>
          <Route exact path="/trips/itinerary/:tripId">
              <Itinerary />
          </Route>
          <Route exact path="/trips/guestlist/:tripId">
              <GuestList />
          </Route>
          <Route path="/trips/costs/:tripId">
              <TripCost />
          </Route>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
