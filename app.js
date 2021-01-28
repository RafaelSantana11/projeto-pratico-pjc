const express = require('express');
const path = require('path');
const cors = require("cors");
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const albumsRouter = require('./routes/albums');

const app = express();

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

app.use('/', [
  indexRouter,
  albumsRouter,
  authRouter
]);

module.exports = app;