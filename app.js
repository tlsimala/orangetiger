var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const mongoose = require( 'mongoose' );
mongoose.connect( 'mongodb://localhost/mydb' );
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we are connected!!!")
});

const clothesController = require('./controllers/clothesController')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req,res,next){
  console.log("about to look for routes!!!")
  //console.dir(req.headers)
  next()
});


app.get('/', function(req, res, next) {
  res.render('index',{title:"Express Demo"});
});

app.get('/griddemo', function(req, res, next) {
  res.render('griddemo',{title:"Grid Demo"});
});

app.get('/myform', function(req, res, next) {
  res.render('myform',{title:"Form Demo"});
});

app.use(function(req,res,next){
  console.log("about to look for post routes!!!")
  next()
});

function processFormData(req,res,next){
  res.render('formdata',
     {title:"Form Data",file:req.body.file})
}   //typec:req.body.ctype , list:req.body.weather

app.post('/processform', clothesController.saveClothes);

app.get('/showClothes', clothesController.getAllClothes);
// app.use('/', indexRouter);  // this is how we use a router to handle the / path
// but here we are more direct



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


// function processFormData(req,res,next){
//   console.log("this is the body %%%")
//   console.dir(req.body)
//   res.render('formdata',{title:"Form Data",
//   file:req.body.clothes, typec:req.body.ctype, list:req.body.weather});
// }


// app.get('/practiceQuiz', function(req, res, next) {
//   res.render('practiceQuiz',{title:"Quiz1"});
// });

//app.post('/processform', clothesController.saveClothes)
//app.get('/showClothes',  clothesController.getAllClothes)

// app.use('/', indexRouter);  // this is how we use a router to handle the / path
// but here we are more direct
