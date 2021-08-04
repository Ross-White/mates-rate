const { User, Trip } = require('../models');

// Create the functions that fulfill the queries defined in `typeDefs.js`
const resolvers = {
  Query: {
    users: async () => {
      // Get and return all documents from the classes collection
      return await User.find({});
    },

    trips: async () => {
      return await Trip.find({});
    }
  },

  Mutation: {
    addTrip: async (parent, { organiser, destination, startDate }) => {
      return Trip.create({ organiser, destination, startDate });
    },
    addActivity: async (parent, { tripId, date, activity }) => {
      return Trip.findByIdAndUpdate(
        { _id: tripId },
        {
          $addToSet: { itinerary: { date, activity }},
        },
        {
          new: true
        }
      )
    }
  }
};

module.exports = resolvers;