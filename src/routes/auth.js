const router = require('express').Router();
const passport = require('passport');
const usersModel = require('../Models/users');

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/error' }),
    function (req, res) {
        const user = new usersModel({
            _id: req.user.id,
            emails: req.user.emails.map((element) => element.value),
            name: req.user.name.givenName,
            familyName: req.user.name.familyName,
        });
        const options = {
            upsert: true,
            new: true,
            setDefaultsOnInsert: true
        };
        usersModel.findByIdAndUpdate(req.user.id, user, options).then(() => {
            req.session.save(() => {
                res.redirect('/link_form');
            });
        });
    });

module.exports = router;