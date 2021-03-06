//para termos acesso ao nosso ficheiro .env e às variaveis lá dentro
require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

// auth =====================================
// const session = require("express-session");
// const passport = require("passport");

// require("./configs/passport");

// =====================================

mongoose
  .connect("mongodb://localhost/BookIT-Server", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err);
  });

//para deixar o nosso servidor usar json files
app.use(express.json());

// auth =====================================
// app.use(
//   session({
//     secret: "some secret goes here",
//     resave: true,
//     saveUninitialized: true,
//   })
// );

// app.use(passport.initialize());
// app.use(passport.session());

// ==========================================

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"], // <== this will be the URL of our React app (it will be running on port 3000)
  })
);

//routes


app.listen(process.env.PORT, () =>
  console.log(`Server started at port: ${process.env.PORT}`)
);
