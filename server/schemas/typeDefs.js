const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    name: String
    email: String
    password: String
  }

  type Trip {
    _id: ID
    destination: String
    startDate: Float
    organiser: ID
    itinerary: [Activity]
    guests: [User]
  }

  type Activity {
    _id: ID
    date: Float
    activity: String
  }

  type Auth {
    token: ID!
    user: User
  }

  # Define which queries the front end is allowed to make and what data is returned
  type Query {
    users: [User]
    trips: [Trip]
    trip(tripId: ID!): Trip
  }

  type Mutation {
    addUser(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addTrip(organiser: ID!, destination: String!, startDate: Float!): Trip
    addActivity(tripId: ID!, date: Float!, activity: String!):Trip
  }
`;

module.exports = typeDefs;