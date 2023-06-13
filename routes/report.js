const router = require('express').Router();
const { isAuthorized, isPremiumUser } = require('../middleware/auth');
const reportDao = require('../daos/report')

router.get("/getAllRecordsForOneUser", isAuthorized, async (req, res, next) => {
    try {
        if (req.query.errorMode == 'y')
        throw new Error("error test");

        const records = await reportDao.getAllRecordsForOneUser(req.userData._id);
        return res.json(records)
    } catch (e) {
        next(e);
    }
});

// router.get("/getSleepHoursBetweenMigraines", isPremiumUser, isAuthorized, async (req, res, next) => {
router.get("/getSleepHoursBetweenMigraines", isAuthorized, async (req, res, next) => {
    try {
        if (req.query.errorMode == 'y')
        throw new Error("error test");
        
        const records = await reportDao.getSleepHoursBetweenMigraines(req.userData._id);
        return res.json(records)
    } catch (e) {
        next(e);
    }
});


module.exports = router;