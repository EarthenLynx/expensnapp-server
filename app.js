// Initialize the base modules
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

// Initialize the routes and the application
const routerUpload = require("./routes/api/upload");
const app = express();

// Initialize the middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 3000

// Uncomment these to set the CORS headers
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// Configure the routes
app.use("/upload", routerUpload);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Basic Error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // send a basic error msg
  res.send({
    statusText: 'error', 
    msg: "An error has occured."
  });
});

// Configure the port. Uses standard node port, alternatively 3000 if not available

// Make the app listen to the standard port
app.listen(PORT, () =>
  console.log(`Started server on http://localhost:${PORT}`)
);
