const mongoose = require('mongoose');

const migraineSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        index: true
    },
    startDate: {
        type: Date,
        required: true
    },
    durationHours: {
        type: Number,
        required: true
    },
    tookMedicine:{
        type: Boolean,
        default: false,
        required: true
    },
    medicineTaken:{
        type: String
    }
});

migraineSchema.index({ medicineTaken: 'text' }); // Create a text index on medicineTaken field

module.exports = mongoose.model("migraine", migraineSchema);