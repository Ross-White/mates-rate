import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        name
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($name: String!, $email: String!, $password: String!) {
    addUser(name: $name, email: $email, password: $password) {
      token
      user {
        _id
        name
      }
    }
  }
`;

export const ADD_TRIP = gql`
  mutation Mutation($destination: String!, $startDate: Float) {
    addTrip(destination: $destination, startDate: $startDate) {
      destination
      organiser
    }
  }
`;

export const ADD_ACTIVITY = gql`
mutation Mutation($addActivityTripId: ID!, $addActivityDate: String!, $addActivityActivity: String!) {
  addActivity(tripId: $addActivityTripId, date: $addActivityDate, activity: $addActivityActivity) {
    _id
    destination
    itinerary {
      date
      activity
    }
  }
}
`;

export const ADD_TRIPCOST = gql`
mutation Mutation($addTripCostTripId: ID!, $addTripCostAmount: String, $addTripCostDescription: String) {
  addTripCost(tripId: $addTripCostTripId, amount: $addTripCostAmount, description: $addTripCostDescription) {
    destination
    costs {
      amount
      description
    }
  }
}
`;