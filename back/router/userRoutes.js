

const express = require('express');

const upload = require('../middleware/file_upload');
const path = require('path')
const csurf = require('csurf')
const userController = require('../controllers/user');
const passport = require('passport');

const imageUpload = upload.single('image');

let router = new express.Router();


var csrfProtection = csurf({ cookie: true })
var csrfM = function (err, req, res, next) {
    if (err.code !== 'EBADCSRFTOKEN') {

        return next(err)
    }
    console.log(err)

    // handle CSRF token errors here
    res.status(403)
    res.send('form tampered with')
};

router.get('/', async (req, res) => {

    await res.sendFile(path.resolve('pages/index.html'))
})

router.get('/signup', csrfProtection, async (req, res) => {
    res.cookie('_csrf', res.cookie.val, { httpOnly: true, maxAge: 14 * 24 * 3600000 })
    res.set('csrfToken', req.csrfToken())
    await res.sendFile(path.resolve('pages/signup.html'), { 'csrfToken': req.csrfToken() })
});
router.post('/signup', imageUpload, userController.chHead, csrfProtection, csrfM, userController.registerUser)
router.get('/signin', csrfProtection, (req, res) => {
    res.set('csrfToken', req.csrfToken())
    res.sendFile(path.resolve('pages/signin.html'), { 'csrfToken': req.csrfToken() });
});
router.post('/signin', userController.chHead, csrfProtection, csrfM,userController.passportLogin )
router.post('/logout', userController.logOut);

module.exports = router;