var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bicicletasRouter = require('./routes/bicicletas');
const apiBicicletasRouter = require('./routes/api/bicicletasApi')

const apiUsuariosRouter = require('./routes/api/usuario')

var app = express();

// Coneccion a la BDD mongo con mongoose

const mongoose = require('mongoose')

const bddString = 'mongodb://localhost:27017/red_bicicletas' // string de conexion
// me conecto a la bdd. Si no existe se crea a la hora de insertar o eliminar un doc NO antes
// Coneccion segun la doc V8.1.1 Usando  async await
async function connect(){
  await mongoose.connect(bddString) 
}
connect()
  .then(console.log('Conexion exitosa'))
  .catch(err => console.error('Error en la conexion ', err))

// Fin conexion mongo

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/bicicletas', bicicletasRouter);
app.use('/api/bicicletas', apiBicicletasRouter)
app.use('/api/usuario', apiUsuariosRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
