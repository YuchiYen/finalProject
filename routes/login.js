const bcrypt = require('bcrypt');
const router = require('express').Router();
const { createUser, retrieveUserByEmail, updateUserPassword } = require('../daos/user');
const { isAuthorized } = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const secret = 'my super secret';

router.post('/signup', async (req, res, next) => {
    const { email, password } = req.body;
    
    // console.log('hit signup here');
    // console.log( 'req.body' , req.body);
    try {
        if (!email) {
            return res.status(400).send('no email provided');
        }

        if (!password) {
            return res.status(400).send('no password provided');
        }

        if (email == "blowUp" && password == "blowUp")
            throw new Error("purposely fail test")

        const user = await retrieveUserByEmail(email);
        if (user) {
            return res.status(409).send('Email already in use');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await createUser({ email, password: hashedPassword });

        return res.sendStatus(200);
    } catch (err) {
        if (err.message == "purposely fail test" )
            return res.status(400).send('purposely fail tes');
        next(err);
    }
    //next();
});

router.post('/', async (req, res, next) => {
    const { email, password } = req.body;

    // console.log('hit login here');
    // console.log('req.body: ', req.body);

    try {
        if (!password) {
            return res.status(400).send('no password provided');
        }

        if (!email) {
            return res.status(400).send('no email provided');
        }

        const user = await retrieveUserByEmail(email);
        if (!user) {
            return res.status(401).send('email not found');
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).send('incorrect password');
        }

        const data = { email: email, _id: user._id, roles: user.roles }
        const token = jwt.sign(data, secret);
        return res.status(200).json({ token });
    } catch (err) {
        next(err);
    }
    next();
});

router.post("/password", isAuthorized, async (req, res, next) => {
    if (!req.body.password || JSON.stringify(req.body.password) === '') {
        return res.status(400).send('password is required');
    }
    
    try {        
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const success = await updateUserPassword(req.userData._id, hashedPassword);        
        return res.sendStatus(success ? 200 : 401);
    } catch (err) {        
        return res.status(500).send(err.message);
    }
});

module.exports = router;