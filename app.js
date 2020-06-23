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

const home = require('./routes/home');
const info = require('./routes/info');
const admin = require('./routes/admin');

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

app.use('/', home);
app.use('/info', info);
app.use('/admin', admin);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))