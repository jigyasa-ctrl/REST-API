//contains subsriber model to interact with databse in an easy way
const mongoose = require('mongoose');

const subscriberSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    subscribedToChannel: {
        type: String,
        required: true
    },
    subscriberDate: {
        type: Date,
        equired: true,
        default: Date.now
    }
})

module.exports = mongoose.model('subscribers', subscriberSchema)