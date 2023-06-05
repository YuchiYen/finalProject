const migraine = require('../models/migraine');
const mongoose = require('mongoose');

module.exports = {};

//create
module.exports.createMigraine = async (migraineRecord) => {
    const createdRec = await migraine.create(migraineRecord);
    return createdRec;
}

//get
module.exports.getAllMigraineByUserId = async (userId) => {
    // const records = await migraine.aggregate([
    //     { $match: { userId: mongoose.Types.ObjectId(userId) } },
    //     { $sort: { startDate: 1 } }
    //   ]).exec();

    try {
        const migraines = await migraine.find({ userId }).sort({ startDate: -1 }).lean();
        //console.log('Migraines:', migraines);
        return migraines
    } catch (err) {
        //console.error(err);
    }
}

//update
module.exports.updateMigraineRecord = async (migraineRecord) => {
    const updatedMigraineRecord = await migraine.updateOne(
        { _id: migraineRecord.recordId },
        {
            userId: migraineRecord.userId,
            startDate: migraineRecord.startDate,
            durationHours: migraineRecord.durationHours,
            tookMedicine: migraineRecord.tookMedicine,
            medicineTaken: migraineRecord.medicineTaken
        }
    );
    return updatedMigraineRecord;
}


//delete
module.exports.deleteMigraineById = async (migraineId) => {
    return await migraine.deleteOne({ _id: migraineId });
}

module.exports.deleteAllMigraineByUserId = async (userId) => {
    return await migraineId.deleteMany({ userId: userId });
}
