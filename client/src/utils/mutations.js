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
  mutation Mutation($organiser: String!, $destination: String!, $startDate: Float) {
    addTrip(organiser: $organiser, destination: $destination, startDate: $startDate) {
      destination
      organiser
    }
  }
`;

export const ADD_ACTIVITY = gql`
  mutation addActivity($tripId: [ID]!, $date: Float!, $activity: String!) {
    addActivity(tripId: $tripId, date: $date, activity: $activity) {
      _id
      destination
      itinerary {
        date
        activity
      }
    }
  }
`;