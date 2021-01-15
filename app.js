var express = require('express');
var path = require('path');
const cors = require("cors");
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var app = express();

//Permitindo acesso somente aos seguintes endereços
app.use(
  cors({
    origin: ["http://localhost", "http://localhost:8080"],
    credentials: true,
  })
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

module.exports = app;