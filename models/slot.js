const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const slotSchema = new Schema({
    name: { type: String, required: false },
    slot: { type: String, required: true },
    date: { type: Date, required: false },
    booked: { type: Boolean, default: false },
    approved: { type: Boolean, default: false },
    rejected: { type: Boolean, default: false },
    sellerId: { type: String, required: true }
}
);

module.exports = mongoose.model('Slot', slotSchema);