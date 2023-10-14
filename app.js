/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
/* eslint-disable indent */
/* eslint-disable no-trailing-spaces */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
// require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const { errors } = require("celebrate");
// const cors = require("cors");
const router = require("./routes");
const errorHandler = require("./middlewares/errorHandler");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const { DB, SERVER_PORT } = require("./utils/config");
const cors = require("./middlewares/cors");

// const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect(DB);

app.use(cors);

// app.use(
//   cors({
//     origin: [
//       "http://localhost:3000",
//       "https://localhost:3000",
//       "http://km.og.nomoredomainsrocks.ru",
//       "https://km.og.nomoredomainsrocks.ru",
//     ],
//     methods: [
//       "GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH", "HEAD",
//     ],
//   }),
// );
// подключаем мидлвары, роуты и всё остальное...
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Сервер сейчас упадёт");
  }, 0);
});
app.use(requestLogger);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(SERVER_PORT, () => {
  console.log(`App listening on port ${SERVER_PORT}`);
});
