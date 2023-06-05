const mongoose = require('mongoose');

const healthRecordSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    sleepHours: {
        type: Number,
        required: true
    },    
    weight: {
        type: Number,
        required: false
      },
    highBP: {
        type: Number,
        required: false
    },
    lowBP: {
        type: Number,
        required: false
    },
    dateTime: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("healthRecord", healthRecordSchema);