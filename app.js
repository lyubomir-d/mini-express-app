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

// app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(multer({dest:"uploads"}).single("filedata"));

app.post("/upload", function (req, res, next) {
    let filedata = req.file;
    let error = '';
    console.log(filedata);
    if(!filedata)
        status = "Ошибка при загрузке файла";
    else
        status = "Файл загружен";

    res.send(status);
});


app.get('/', function (req, res) {
    res.render('home.html')
});

app.listen(port, () => console.log(`Express test app listening at http://localhost:${port}`))