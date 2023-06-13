const router = require('express').Router();
const { isAuthorized, isPremiumUser } = require('../middleware/auth');
//const { createHealthRecord, getHealthRecordByUserId, updateHealthRecord, deleteRecordById, deleteAllRecordsByUserId } = require('../daos/healthRecord');
const migraineOAO = require('../daos/migraine');

router.post("/create", isAuthorized, async (req, res, next) => {
    try {
        if (req.query.errorMode == 'y')
            throw new Error("error test")

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
        //console.log(e);
        next(e)
    }
});

router.put("/:id", isAuthorized, async (req, res, next) => {
    try {        
        if (req.query.errorMode == 'y')
            throw new Error("error test")

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
        //console.log(e);
        next(e)
    }
});

router.get("/", isAuthorized, async (req, res, next) => {
    try {        
        if (req.query.errorMode == 'y')
            throw new Error("error test");

        const records = await migraineOAO.getAllMigraineByUserId(req.userData._id);
        return res.json(records);
    } catch (e) {
        //console.log(e);
        next(e);
    }
});

router.get("/search", isAuthorized, async (req, res, next) => {
    try {       
        if (req.query.errorMode == 'y')
            throw new Error("error test")

        const searchTerm = req.query.searchTerm;

        //console.log('in /search route, searchTerm is: ' , req.query.searchTerm);

        const records = await migraineOAO.MedicineTakenTextSearch(req.userData._id, searchTerm);
        return res.json(records)
              
    } catch (e) {
        //console.log(e);
        next(e);
    }
});

router.delete("/:id", isAuthorized, async (req, res, next) => {
    try {        
        if (req.query.errorMode == 'y')
            throw new Error("error test")

        const item = await migraineOAO.deleteMigraineById(req.params.id);
        return res.json(item);
    } catch (e) {
        //console.log(e);
        next(e);
    }
});

router.delete("/", isAuthorized, async (req, res, next) => {
    try {        
        if (req.query.errorMode == 'y')
            throw new Error("error test")

        const records = await migraineOAO.deleteAllMigraineByUserId(req.userData._id);
        return res.json(records);
    } catch (e) {
        //console.log(e);
        next(e);
    }
});

module.exports = router;