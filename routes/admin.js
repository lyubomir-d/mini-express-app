const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    res.render('pages/admin/admin.html', {
        title: "Admin",
    })
});

module.exports = router;