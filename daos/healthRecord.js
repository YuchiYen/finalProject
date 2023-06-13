const HealthRcd = require('../models/healthRecord');
const mongoose = require('mongoose');

module.exports = {};

//create
module.exports.createHealthRecord = async (healthRecord) => {
    const createdRec = await HealthRcd.create(healthRecord);
    
    //console.log("in daos healthRecords.js createdRec is ", createdRec )
    
    //when I used spread operator, it picked up a bunch of extra garbage data.
    createdRecResult = {
        userId: createdRec.userId,
        sleepHours: createdRec.sleepHours,
        weight: createdRec.weight ,
        highBP: createdRec.highBP ,
        lowBP:  createdRec.lowBP ,
        dateTime: createdRec.dateTime.toISOString(),
        _id: createdRec._id
    }
    //console.log("createdRecResult is ", createdRecResult )
    return createdRecResult;
}

//get
module.exports.getHealthRecordByUserId = async (userId) => {
    //console.log('in Get, userId is:  ' , userId);
    const records = await HealthRcd.aggregate([
        { $match: { userId: new mongoose.Types.ObjectId(userId) } },
        { $sort: { recordedAt: 1 } }
    ]);
    //console.long("in daos healthRecords.js records are: ", records )
    return records;
}

// module.exports.getHealthRecordAll = async () => {
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

