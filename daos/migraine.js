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
    const migraines = await migraine.find({ userId }).sort({ startDate: 1 }).lean();
    return migraines
}

module.exports.MedicineTakenTextSearch = async (userId, searchTerm) => {

    const migraines = await migraine.find({
        userId: userId,
        $text: { $search: searchTerm }
    }).sort({ startDate: 1 });

    return migraines;
};

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

module.exports.deleteMigraineById = async (migraineId) => {
    return await migraine.deleteOne({ _id: migraineId });
}

module.exports.deleteAllMigraineByUserId = async (userId) => {
    return await migraine.deleteMany({ userId: userId });
}
