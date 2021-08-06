const { Schema, model } = require('mongoose');

const costSchema = new Schema({
    trip: {
        type: Schema.Types.ObjectId,
        ref: 'Trip',
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    amount: {
        type: Number,
    },
    description: {
        type: String,
    },
    users: [{
        id: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        paid: {
            type: Boolean,
        }
    }],
});

const Cost = model('Cost', costSchema);

module.exports = Cost;


// Trip ID

// Trip All Costs = []

        // Each Object is going to have the user who uploaded it and the amount...


// Each persons tab: []

        // Each object keeps track how much they have spent / how much they are owed 
