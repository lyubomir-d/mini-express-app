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

router.post('/upload', cpUpload, function (req, res, next) {
    let files = req.files;
    let error = '';
    console.log(files);
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