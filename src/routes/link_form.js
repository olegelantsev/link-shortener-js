const router = require('express').Router();
const urlsModel = require('../Models/urls');

const { isAuthenticated } = require('../utils');

router.get('/', isAuthenticated, (req, res) => res.render('pages/link_form', { user: req.user }));

const shortRandomUUID = () => {
    return crypto.randomUUID().split('-')[0];
}
router.post('/', isAuthenticated, async function (req, res) {
    var url = req.body.url;
    let uuid = shortRandomUUID();

    let obj = await urlsModel.findOne({ shortUrl: uuid });
    while (obj != null) {
        uuid = shortRandomUUID();
        obj = await urlsModel.findOne({ shortUrl: uuid });
    }
    new urlsModel({
        url: url,
        shortUrl: uuid,
        user: req.user,
    }).save()
        .then(() => {
            res.render('pages/link_created', { shortUrl: process.env.HOSTNAME +'/x/' + uuid });
        }).catch(e => {
            console.log(e);
        });

});

module.exports = router;