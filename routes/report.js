const router = require('express').Router();
const { isAuthorized, isPremiumUser } = require('../middleware/auth');
const reportDao = require('../daos/report')

router.get("/getAllRecordsForOneUser", isAuthorized, async (req, res, next) => {
    try {
        const records = await reportDao.getAllRecordsForOneUser(req.userData._id);

        console.log('req.userData._id', req.userData._id);
        // if (req.userData.roles.includes('admin') || req.userData._id === order.userId.toString()) 
        //     return res.json(order);

        if (records) {
            console.log('records', JSON.stringify(records))
            return res.json(records)
        }
        res.sendStatus(404);
    } catch (e) {
        next(e);
    }
});

router.get("/getSleepHoursBetweenMigraines", isAuthorized, async (req, res, next) => {
    try {
        const records = await reportDao.getSleepHoursBetweenMigraines(req.userData._id);

        console.log('req.userData._id', req.userData._id);
        // if (req.userData.roles.includes('admin') || req.userData._id === order.userId.toString()) 
        //     return res.json(order);

        if (records) {
            console.log('records', JSON.stringify(records))
            return res.json(records)
        }
        res.sendStatus(404);
    } catch (e) {
        next(e);
    }
});




// router.get('/sleep-hours-between-migraines', async (req, res) => {
//     try {
//       // Find all migraines ordered by start date
//       const migraines = await Migraine.find({}).sort({ startDate: 1 });
  
//       // Initialize an array to store the sleep hours between migraines
//       const sleepHoursBetweenMigraines = [];
  
//       // Iterate through the migraines
//       for (let i = 0; i < migraines.length - 1; i++) {
//         const currentMigraine = migraines[i];
//         const nextMigraine = migraines[i + 1];
  
//         // Find health records between the start dates of consecutive migraines
//         const healthRecords = await HealthRecord.find({
//           userid: currentMigraine.userid,
//           dateTime: { $gt: currentMigraine.startDate, $lt: nextMigraine.startDate }
//         });
  
//         // Calculate the total sleep hours between the migraines
//         const sleepHours = healthRecords.reduce((total, record) => total + record.sleepHours, 0);
  
//         // Calculate the duration of the current migraine
//         const migraineDuration = currentMigraine.durationHours;
  
//         // Add the sleep hours and migraine duration to the result array
//         sleepHoursBetweenMigraines.push({
//           sleepHoursBetween: sleepHours,
//           migraineDuration: migraineDuration
//         });
//       }
  
//       res.status(200).json(sleepHoursBetweenMigraines);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'An error occurred while retrieving the sleep hours between migraines.' });
//     }
//   });

module.exports = router;