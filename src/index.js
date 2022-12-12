const mongoose = require("mongoose");
const app = require("./app");
const config = require("./config/config");

mongoose.set('strictQuery', true);//Mongoose: the `strictQuery` option will be switched back to `false` by default in Mongoose 7.
let server;
mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
    console.log("Connected to MongoDB");
    server = app.listen(config.SERVER_PORT, () => {
      console.log(`App is running on port ${config.SERVER_PORT}`);
    });
    return;
})
.catch((error) => {
  console.log("error connecting to MongoDb:", error.message);
});

const exitHandler = () => {
  if(server){
    server.close(() => {
      console.log("Server closed");
      process.exit(1);
    });
  }else{
    process.exit(1);
  }
}

const unexpectedErrorHandler = (error) => {
  console.log(error);
  exitHandler();
}

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  console.log("SIGTERM received");
  if (server) {
    server.close();
  }
});
