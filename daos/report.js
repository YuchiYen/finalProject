const migraine = require('../models/migraine');
const healthRecord = require('../models/healthRecord');
const mongoose = require('mongoose');
module.exports = {};

//Return all Health records and migraine records of a user
module.exports.getAllRecordsForOneUser = async (userId) => {
  try {

    const pipeline = [
      // Match health records and migraines for the userId
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId)
        }
      },
      // Project health record fields, add a type field to identify it as 'healthRecord', and rename dateTime to date
      {
        $project: {
          _id: 1,
          userId: 1,
          sleepHours: 1,
          weight: 1,
          highBP: 1,
          lowBP: 1,
          date: '$dateTime',
          type: 'healthRecord'
        }
      },
      // Union with the migraines collection
      {
        $unionWith: {
          coll: 'migraines',
          pipeline: [
            // Match migraines for the userId
            {
              $match: {
                userId: new mongoose.Types.ObjectId(userId)
              }
            },
            // Project migraine fields, add a type field to identify it as 'migraine', and rename startDate to date
            {
              $project: {
                _id: 1,
                userId: 1,
                date: '$startDate',
                durationHours: 1,
                tookMedicine: 1,
                medicineTaken: 1,
                type: 'migraine'
              }
            }
          ]
        }
      },
      // Sort the combined results based on date in ascending order
      {
        $sort: {
          date: 1
        }
      }
    ];
    // Execute the aggregation pipeline
    const combinedResults = await healthRecord.aggregate(pipeline);


    return combinedResults;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while retrieving the records.');
  }
};


module.exports.getSleepHoursBetweenMigraines = async (userId) => {
    try {
      const migraines = await migraine.find({ userId }).sort({ startDate: 1 }); 
      
      console.log('userId', userId);
      const migraine1 = await migraine.find({ userId }).sort({ startDate: 1 });
      console.log('migraines1' , JSON.stringify(migraine1));

      const healthRecord1s = await healthRecord.find({userId});
      console.log('healthRecord' , JSON.stringify(healthRecord1s));

      const result = [];
      for (let i = 0; i < migraines.length; i++) {
        const currentMigraine = migraines[i];
        const nextMigraine = migraines[i + 1];
  
        const healthRecords = await healthRecord.find({
          userId,
          dateTime: {
            $gte: currentMigraine.startDate,
            $lt: nextMigraine ? nextMigraine.startDate : new Date()
          }
        }).sort({ dateTime: 1 });
  
        result.push({
          migraine: currentMigraine,
          healthRecords
        });
      }
      return result;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while retrieving the sleep hours.');
  }
};


module.exports.MedicineTakenTextSearch = async (userId, searchTerm) => {
  try {
    const migraines = await Migraine.find({
      userid: userId,
      $text: { $search: searchTerm }
    }).sort({ startDate: 1 });

    const migraineStartTimes = migraines.map((migraine) => migraine.startDate);

    return migraineStartTimes;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while performing the text search.');
  }
};

  // // Usage
  // searchMigrainesByMedicineTaken('your_user_id', 'pain killer')
  //   .then((migraineStartTimes) => {
  //     console.log(migraineStartTimes);
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });