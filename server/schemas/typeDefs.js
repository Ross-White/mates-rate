const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    name: String
    email: String
    password: String
    trips: [Trip]
  }

  type Trip {
    _id: ID
    destination: String
    startDate: Float
    organiser: ID
    itinerary: [Activity]
    guests: [User]
    costs: [Cost]
  }

  type Cost {
    _id: ID
    amount: String
    description: String
  }

  type Activity {
    _id: ID
    date: String
    activity: String
  }

  type Auth {
    token: ID!
    user: User
  }

  # Define which queries the front end is allowed to make and what data is returned
  type Query {
    users: [User]
    userTrips: User
    trip(tripId: ID!): Trip
  }

  type Mutation {
    addUser(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addTrip(destination: String!, organiser: String startDate: Float): Trip
    addActivity(tripId: ID!, date: String!, activity: String!): Trip
    addUserToTrip(tripId: ID!, guests: ID!): Trip
    addTripCost(tripId: ID!, amount: String, description: String): Trip
  }
`;

module.exports = typeDefs;