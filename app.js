const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const connect = require('connect');
const serveStatic = require('serve-static');
const http = require('http');

const hbs = require("hbs");
const multer  = require("multer");
const expressHbs = require("express-handlebars");


const sassMiddleware = require('node-sass-middleware');
const srcPath = __dirname + '/scss';
const destPath = __dirname + '/public/styles';

// const { body,validationResult } = require('express-validator/check');
// const { sanitizeBody } = require('express-validator/filter');

// const connectDB = require('./config/db');

// Connect Database
// connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

app.use('/styles', sassMiddleware({
    src: srcPath,
    dest: destPath,
    debug: true,
    outputStyle: 'expanded'
}));
app.use('/',
    serveStatic('./public', {})
);

app.set("view engine", "html");
app.engine("html", expressHbs(
    {
        layoutsDir: "views/layouts",
        defaultLayout: "layout",
        extname: "html"
    }
));
hbs.registerPartials(__dirname + "/views/partials");

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
    res.render('home/home.html')
});

// app.use('/public', express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))