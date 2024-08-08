const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    location: String,
    attendees: Number,
}, {
    Timestamp: true,
});

module.exports = mongoose.model("Event", eventSchema);