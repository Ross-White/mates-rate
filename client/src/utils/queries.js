import { gql } from '@apollo/client';

export const QUERY_TRIPS = gql`
    query getTrips {
        trips {
            _id
            destination
            startDate
        }
    }
`;

export const QUERY_SINGLE_TRIP = gql`
  query getSingleTrip($tripId: ID!) {
    trip(tripId: $tripId) {
      _id          
      destination
      startDate
      itinerary {
        _id
        date
        activity
      }
      guests {
          _id
          name
          email
      }
    }
  }
`;