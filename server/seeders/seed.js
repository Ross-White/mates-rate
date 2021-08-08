const db = require('../connection/connection');
const { User, Trip } = require('../models');
const userSeeds = require('./userSeeds.json');
const tripSeeds = require('./tripSeeds');

db.once('open', async () => {
  try {
    await User.deleteMany({});
    await Trip.deleteMany({});

    await Trip.create(tripSeeds);
    await User.create(userSeeds);

  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
