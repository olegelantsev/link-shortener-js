const auth = require('./auth');
const profile = require('./profile');
const link_form = require('./link_form');
const link_forwarder = require('./link_forwarder');
const express = require("express");
const router = express.Router();

router.use('/auth', auth);
router.use('/profile', profile);
router.use('/link_form', link_form);
router.use('/x', link_forwarder);

module.exports = router;