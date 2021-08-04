const { Schema, model } = require('mongoose');

const tripSchema = new Schema({
    destination: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    startDate: {
        type: Date,
        required: true,
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
            }
        }
    ],
    guests: [{
        type: Schema.Types.ObjectId,
    }]

});

const Trip = model('Trip', tripSchema);

module.exports = Trip;