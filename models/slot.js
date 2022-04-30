const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const slotSchema = new Schema({
    name: { type: String, required: true },
    slot: { type: String, required: true },
    //date: { type: Date, required: true },
    booked: {type: Boolean, default: false},
    approved: {type: Boolean, default: false},
    rejected: { type: Boolean, default: false }
}
);

module.exports = mongoose.model('Slot', slotSchema);