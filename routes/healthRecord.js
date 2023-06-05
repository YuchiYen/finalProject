const router = require('express').Router();
const { isAuthorized, isPremiumUser } = require('../middleware/auth');
const { createHealthRecord, getHealthRecordByUserId, updateHealthRecord, deleteRecordById, deleteAllRecordsByUserId } = require('../daos/healthRecord');

router.post("/create", isAuthorized, async (req, res, next) => {
    try {

        const healthRecordObj = {
            userId: req.userData._id,
            sleepHours: req.body.sleepHour,
            weight: req.body.weight,
            highBP: req.body.highBP,
            lowBP: req.body.lowBP,
            dateTime: req.body.dateTime
        }

        //console.log('healthRecordObj' , healthRecordObj);
        const created = await createHealthRecord(healthRecordObj);
        return res.status(200).json(created);
    } catch (e) {
        next(e)
    }
});

router.put("/:id", isAuthorized, async (req, res, next) => {
    try {

        const healthRecordObj = {
            recordId: req.params.id,
            userId: req.userData._id,
            sleepHours: req.body.sleepHour,
            weight: req.body.weight,
            highBP: req.body.highBP,
            lowBP: req.body.lowBP,
            dateTime: req.body.dateTime
        }

        const updated = await updateHealthRecord(healthRecordObj)
        return res.status(200).json(updated)
    } catch (e) {
        next(e)
    }
});

router.get("/", isAuthorized, async (req, res, next) => {
    try {
        const records = await getHealthRecordByUserId(req.userData._id);

        //console.log('req.userData._id', req.userData._id);
        // if (req.userData.roles.includes('admin') || req.userData._id === order.userId.toString()) 
        //     return res.json(order);

        if (records) {
        //    console.log('records', JSON.stringify(records))
            return res.json(records)
        }
        res.sendStatus(404);
    } catch (e) {
        next(e);
    }
});

router.delete("/:id", isAuthorized, async (req, res, next) => {
    try {
        const item = await deleteRecordById(req.params.id);
        return res.json(item);
    } catch (e) {
        next(e);
    }
});


router.delete("/", isAuthorized, async (req, res, next) => {
    try {
        const records = await deleteAllRecordsByUserId(req.userData._id);
        return res.json(records);
    } catch (e) {
        next(e);
    }
});

module.exports = router;