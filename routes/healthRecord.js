const router = require('express').Router();
const { isAuthorized, isPremiumUser } = require('../middleware/auth');
const { createHealthRecord, getHealthRecordByUserId, updateHealthRecord, deleteRecordById, deleteAllRecordsByUserId, getHealthRecordAll } = require('../daos/healthRecord');

router.post("/create", isAuthorized, async (req, res, next) => {
    try {        
        //console.log("querystring in Post", req.query)

        if (req.query.errorMode == 'y')
            throw new Error("error test")
        
        const healthRecordObj = {
            userId: req.userData._id,
            sleepHours: req.body.sleepHours,
            weight: req.body.weight,
            highBP: req.body.highBP,
            lowBP: req.body.lowBP,
            dateTime: new Date(req.body.dateTime)
        }        
        const created = await createHealthRecord(healthRecordObj);
        return res.status(200).json(created);
    } catch (e) {
        next(e)
    }
});

router.put("/:id", isAuthorized, async (req, res, next) => {
    try {
        //console.log("querystring in Put", req.query)
        if (req.query.errorMode == 'y')
            throw new Error("error test")

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
        console.log('fall in catch routine', e.message);
        next(e)
    }
});

router.get("/", isAuthorized, async (req, res, next) => {
    try {
        if (req.query.errorMode == 'y')
            throw new Error("error test")

        const records = await getHealthRecordByUserId(req.userData._id);
        return res.json(records);        
    } catch (e) {
        next(e);
    }
});

router.delete("/:id", isAuthorized, async (req, res, next) => {
    try {
        if (req.query.errorMode == 'y')
            throw new Error("error test")

        const item = await deleteRecordById(req.params.id);
        return res.json(item);
    } catch (e) {
        next(e);
    }
});

router.delete("/", isAuthorized, async (req, res, next) => {
    try {
        if (req.query.errorMode == 'y')
            throw new Error("error test")

        const records = await deleteAllRecordsByUserId(req.userData._id);
        return res.json(records);
    } catch (e) {
        next(e);
    }
});

module.exports = router;