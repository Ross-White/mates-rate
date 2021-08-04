const { AuthenticationError } = require('apollo-server-express');
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
    addUser: async(parent, { name, email, password }) => {
      return await User.create({ name, email, password });
    },
    login: async(parent, { email, password }) => {
      const user = await User.findOne({ email });
      console.log(user);
      if (!user) {
        throw new AuthenticationError('No user found with that email address');
      }

      const correctPw = await user.isCorrectPassword(password);
      console.log('Correct Password:::', correctPw);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }
      return user;
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