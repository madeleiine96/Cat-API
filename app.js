var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var indexRouter = require("./routes/index");
var kattRouter = require("./routes/cats");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Connection to database
var mongoose = require("mongoose");
mongoose.connect(
      "mongodb+srv://magu0112:Lösenord@cluster0.fuf7t7m.mongodb.net/umw200?retryWrites=true&w=majority"
);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function (callback) {
      console.log("Connection was a success!");
});

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/", indexRouter);
app.use("/cats", kattRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
      next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get("env") === "development" ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.render("error");
});

module.exports = app;
