const router = require('express').Router();
const { isAuthorized, isPremiumUser } = require('../middleware/auth');
//const { createHealthRecord, getHealthRecordByUserId, updateHealthRecord, deleteRecordById, deleteAllRecordsByUserId } = require('../daos/healthRecord');
const migraineOAO = require('../daos/migraine');

router.post("/create", isAuthorized, async (req, res, next) => {
    try {

        const migraineObj = {
            userId: req.userData._id,
            startDate: req.body.startDate,
            durationHours: req.body.durationHours,
            tookMedicine: req.body.tookMedicine,
            medicineTaken: req.body.medicineTaken
        }
        const created = await migraineOAO.createMigraine(migraineObj);
        return res.status(200).json(created);
    } catch (e) {
        next(e)
    }
});

router.put("/:id", isAuthorized, async (req, res, next) => {
    try {

        const migraineObj = {
            recordId: req.params.id,
            startDate: req.body.startDate,
            durationHours: req.body.durationHours,
            tookMedicine: req.body.tookMedicine,
            medicineTaken: req.body.medicineTaken
        }

        const updated = await migraineOAO.updateMigraineRecord(migraineObj)
        return res.status(200).json(updated)
    } catch (e) {
        next(e)
    }
});

router.get("/", isAuthorized, async (req, res, next) => {
    try {
        const records = await migraineOAO.getAllMigraineByUserId(req.userData._id);

        //console.log('req.userData._id', req.userData._id);
        // if (req.userData.roles.includes('admin') || req.userData._id === order.userId.toString()) 
        //     return res.json(order);

        if (records) {
            //console.log('records', JSON.stringify(records))
            return res.json(records)
        }

        res.sendStatus(404);
    } catch (e) {
        next(e);
    }
});

router.delete("/:id", isAuthorized, async (req, res, next) => {
    try {
        const item = await migraineOAO.deleteMigraineById(req.params.id);
        return res.json(item);
    } catch (e) {
        next(e);
    }
});


router.delete("/", isAuthorized, async (req, res, next) => {
    try {
        const records = await migraineOAO.deleteAllMigraineByUserId(req.userData._id);
        return res.json(records);
    } catch (e) {
        next(e);
    }
});

module.exports = router;