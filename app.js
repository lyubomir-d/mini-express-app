const express = require("express");
const hbs = require("hbs");
const multer  = require("multer");
const expressHbs = require("express-handlebars");

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

const app = express();
const port = 5000;

app.set("view engine", "html");
app.engine("html", expressHbs(
    {
        layoutsDir: "views/layouts",
        defaultLayout: "layout",
        extname: "html"
    }
));
hbs.registerPartials(__dirname + "/views/partials");

/*** Old version ***/

var storageConfig = multer.diskStorage({
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

app.post('/upload', cpUpload, function (req, res, next) {
    let files = req.files;
    let error = '';
    console.log(files);
    if(!files)
        status = "Ошибка при загрузке файла";
    else
        status = "Файл загружен";

    res.send(status);

});

app.get('/info', function (req, res) {
    res.render("info.html", {
        title: "Мои контакты",
        email: "gavgav@mycorp.com",
        phone: "+1234567890"
    })
});

app.get('/admin', function (req, res) {
    res.render('info.html', {
        title: "Мои контакты",
        email: "gavgav@mycorp.com",
        phone: "+1234567890"
    })
});

app.get('/', function (req, res) {
    res.render('home.html')
});

app.listen(port, () => console.log(`Express test app listening at http://localhost:${port}`))