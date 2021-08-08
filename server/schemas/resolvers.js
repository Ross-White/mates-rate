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

    trip: async (parent, args) => {
      return await Trip.findById(args.tripId);
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
          $addToSet: { itinerary: { date, activity } },
        },
        {
          new: true
        }
      )
    },
    addUserToTrip: async (parent, { tripId, guests }) => {
      const guest = await User.findOne({ _id: guests });
      const trip = await Trip.findOne({ _id: tripId });
      console.log("User::::", guest);
      console.log("Trip:::", trip)
      const updatedTrip = await Trip.findOneAndUpdate(
        { _id: tripId },
        {
          $addToSet: { guests: guest }
        },
        { new: true }
      )
      const updatedUser = await User.findOneAndUpdate(
        { _id: guests},
        {
          $addToSet: { trips: trip._id }
        },
        { new: true }
      )
      return updatedTrip, updatedUser
    }
  }
};

module.exports = resolvers;