const { Router } = require("express");
const router = Router();

router.use("/login", require('./login'));
router.use("/healthRecord", require('./healthRecord'));
router.use("/migraine", require('./migraine'));
router.use("/report", require('./report'));

// Error handling middleware here
router.use((err, req, res, next) => {

    console.log("err is: " + err);
    console.log("err.stack is: " + err.stack);
    
    res.status(500).json({ message: err.message });    
  });

module.exports = router;