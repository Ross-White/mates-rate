const { Schema, model } = require('mongoose');

const tripSchema = new Schema({
    destination: {
        type: String,
        required: true,
        trim: true,
    },
    startDate: {
        type: Date,
    },
    organiser: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    itinerary: [
        {
            date: {
                type: String,
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
    }],
    costs: [{
        amount: {
            type: String
        },
        description: {
            type: String
        }

    }]

});

const Trip = model('Trip', tripSchema);

module.exports = Trip;