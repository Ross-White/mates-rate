const { AuthenticationError } = require('apollo-server-express');
const { User, Trip } = require('../models');
const { signToken } = require('../utils/auth');

// Create the functions that fulfill the queries defined in `typeDefs.js`
const resolvers = {
  Query: {
    users: async () => {
      // Get and return all documents from the classes collection
      return await User.find({});
    },

    trips: async () => {
      return await Trip.find({});
    },

    trip: async (parent, { thougtId }) => {
      return await Trip.findOne({ _id: thougtId });
    }
  },

  Mutation: {
    addUser: async (parent, { name, email, password }) => {
      const user = await User.create({ name, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      console.log({ token, user })
      return { token, user };
    },
    addTrip: async (parent, { organiser, destination, startDate }) => {
      return await Trip.create({ organiser, destination, startDate });
    },
    addActivity: async (parent, { tripId, date, activity }) => {
      return await Trip.findByIdAndUpdate(
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