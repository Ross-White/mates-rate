const db = require('../connection/connection');
const { User, Trip } = require('../models');
const userSeeds = require('./userSeeds.json');
const tripSeeds = require('./tripSeeds');

db.once('open', async () => {
  await User.deleteMany({});
  await User.create(userSeeds);

  await Trip.deleteMany({});
  await Trip.create(tripSeeds);

  console.log('all done!');
  process.exit(0);
});
