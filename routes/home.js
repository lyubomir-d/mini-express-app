const express = require('express');
const router = express.Router();

const multer  = require("multer");

const storageConfig = multer.diskStorage({
        destination: (req, file, cb) =>{
        cb(null, "uploads");
},
filename: (req, file, cb) =>{
    cb(null, file.originalname);
}
});

const fileFilter = (req, file, cb) => {

    if(file.mimetype === "image/png" ||
        file.mimetype === "image/jpg"||
        file.mimetype === "image/jpeg"){
        cb(null, true);
    }
    else{
        cb(null, false);
    }
}

var upload = multer({storage:storageConfig, fileFilter: fileFilter})

let cpUpload = upload.fields([
    { name: 'passport-1' },
    { name: 'passport-2' },
    { name: 'driver_licence-1' },
    { name: 'driver_licence-2' },
    { name: 'car_registration' },
])

/*** Send mail ***/
const nodemailer = require("nodemailer");

async function mail(textMail) {
    let testEmailAccount = await
    nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
            user: testEmailAccount.user,
            pass: testEmailAccount.pass
        }
    });

    let result = await
    transporter.sendMail({
        from: '"Node js" <nodejs@example.com>',
        to: "ruldo@bk.ru",
        subject: "Message from Node js",
        text: "This message was sent from Node js server.",
        html: "This <i>message</i> was sent from <strong>Node js</strong> server."
    });
    console.log(result);
}

/*** end of send mail ***/

router.post('/upload', cpUpload, function (req, res, next) {
    let files = req.files;
    console.log('files', files);
    mail("Приветик").catch(console.error);
    if(!files)
        status = "Ошибка при загрузке файла";
    else
        status = "Файл загружен";

    res.send(status);

});

router.get('/', function (req, res) {
    res.render('pages/home/home.html')
});

module.exports = router;