const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

//Token Encryption
const config = require('./config');

//Login
const login_db = require('../api/login');
router.post('/', login_db.Login);

//Token Valid
router.use('*', async function (req, res, next) {
    const token = req.headers['authorization'];
    if (token) {
        try{
            const decoded = await jwt.verify(token, config.encryption);
            req.decoded = decoded;
            next();
        }
        catch(err) {
            res.status(200).json({
                success: false,
                message: err.message
            });
        }
    } else {
        next();
    }
});

router.get('/refresh', login_db.RefreshToken);

//Member Info
const member_db = require('../api/member');
router.get('/member', member_db.GetMembers);
router.post('/member', member_db.CreateMember);

const path = require('path');
router.use(function(req, res) {
   res.sendFile(path.join(__dirname, '..', 'public/index.html')); // load the single view file (angular will handle the page changes on the front-end)
});

module.exports = router;
