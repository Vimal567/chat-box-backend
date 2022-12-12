const express = require("express");
const compression = require("compression");
const cors = require("cors");
const httpStatus = require("http-status");
const routes = require("./routes/chats.route");
const ApiError = require("./utils/ApiError");
const helmet = require("helmet");

const app = express();

// set security HTTP headers - https://helmetjs.github.io/
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options("*", cors());

// app.use(passport.initialize());
// passport.use("jwt", jwtStrategy);

// Reroute all API request starting with "/v1" route
app.use("/", routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

module.exports = app;