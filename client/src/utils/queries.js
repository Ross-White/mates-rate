import { gql } from '@apollo/client';

export const QUERY_USER_TRIPS = gql`
    query getUserTrips {
        userTrips {
            _id
            name
            email
            trips {
                _id
                destination
                startDate
            }
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