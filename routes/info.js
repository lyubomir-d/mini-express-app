const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    res.render("pages/info/info.html", {
        title: "Мои контакты",
        email: "gavgav@mycorp.com",
        phone: "+1234567890"
    })
});

module.exports = router;