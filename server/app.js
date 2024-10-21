const createError = require("http-errors");
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config({ path: "./config.env" });
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const indexRouter = require("./routes/index");
const game1 = require("./routes/game-1");
const game2 = require("./routes/game-2");

const app = express();

app.use(
  cors({
    origin: "https://photo-tagging-app-1.onrender.com",
    credentials: true,
  }),
);

// setup mongoose
const mongoDB = process.env.mongoDB;
mongoose.set("strictQuery", false);
const mongoDBase = mongoDB;
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDBase);
}

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("uploads"));

// Define routes
app.use("/", indexRouter);
app.use("/game-one", game1);
app.use("/game-two", game2);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
