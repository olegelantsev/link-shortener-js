
const router = require('express').Router();
const urlsModel = require('../Models/urls');

router.get('/:shortUrl', async function (req, res) {
    obj = await urlsModel.findOne({ shortUrl: req.params.shortUrl });
    if (obj != null) {
        res.redirect(obj.url);
    } else {
        res.status(404).send("Short url not found");
    }
    
});

module.exports = router;