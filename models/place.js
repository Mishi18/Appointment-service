const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const placeSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    address: { type: String, required: true },
    slots: [{
        name: { type: String, required: true },
        slot: { type: String, required: true },
        booked: { type: Boolean, default: false }
    }]}
);

module.exports = mongoose.model('Place', placeSchema);