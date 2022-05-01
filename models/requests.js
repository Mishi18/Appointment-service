const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const requestsSchema = new Schema({

    userId: { type: String, default: false },
    slotId: { type: String, default: false },
    sellerId: { type: String, required: true },
    status: { type: String, required: true }
}
);

module.exports = mongoose.model('Requests', requestsSchema);