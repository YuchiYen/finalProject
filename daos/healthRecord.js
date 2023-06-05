const HealthRcd = require('../models/healthRecord');
const mongoose = require('mongoose');

module.exports = {};

//create
module.exports.createHealthRecord = async (healthRecord) => {
    const createdRec = await HealthRcd.create(healthRecord);
    
    return createdRec;
}

//get
module.exports.getHealthRecordByUserId = async (userId) => {
    const records = await HealthRcd.aggregate([
        { $match: { userId: new mongoose.Types.ObjectId(userId) } },
        { $sort: { recordedAt: 1 } }
    ]);

    return records;
}

// //get
// module.exports.getAll = async () => {
//     const records = await HealthRcd.find().lean();
//     return records
// }

//update
module.exports.updateHealthRecord = async (healthRecord) => {
    const updatedHealthRcd = await HealthRcd.updateOne(
        { _id: healthRecord.recordId },
        {
            userId: healthRecord.userId,
            sleepHours: healthRecord.sleepHours,
            weight: healthRecord.weight,
            highBP: healthRecord.highBP,
            lowBP: healthRecord.lowBP,
            dateTime: healthRecord.dateTime
        }
    );
    return updatedHealthRcd;
}

//delete
module.exports.deleteRecordById = async (recordId) => {
    return await HealthRcd.deleteOne({ _id: recordId });
}

module.exports.deleteAllRecordsByUserId = async (userId) => {
    return await HealthRcd.deleteMany({ userId: userId });
}

