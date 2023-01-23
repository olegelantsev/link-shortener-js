const router = require('express').Router();

router.get('/', (req, res) => res.render('pages/profile', { user: req.user }));

module.exports = router;