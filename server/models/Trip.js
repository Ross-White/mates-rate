const { Schema, model } = require('mongoose');

const tripSchema = new Schema({
    destination: {
        type: String,
        required: true,
        trim: true,
    },
    startDate: {
        type: Date,
        // required: true,
    },
    organiser: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    itinerary: [
        {
            date: {
                type: Date,
                required: true
            },
            activity: {
                type: String,
                required: true,
            },
            location: {
                type: String,
            }
        }
    ],
    guests: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }]

});

const Trip = model('Trip', tripSchema);

module.exports = Trip;