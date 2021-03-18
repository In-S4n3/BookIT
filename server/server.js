//para termos acesso ao nosso ficheiro .env e às variaveis lá dentro
require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
//const socketIo = require("socket.io");

// auth =====================================
const session = require("express-session");
const passport = require("passport");
require("./config/passport");

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
app.use(
  session({
    secret: "some secret goes here",
    resave: true,
    saveUninitialized: true,
    // cookie: {
    //   sameSite: "none", //true, //the requester is on the same domain
    //   secure: true, //false, //not using https
    //   httpOnly: false, //true, //site on only on http
    //   maxAge: 60000, //cookie time to live
    // },
    // rolling: true, //session gets refreshed
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Socket.IO enables real-time, bidirectional and event-based communication.
// It works on every platform, browser or device, focusing equally on reliability and speed.

// let io = socketIo();
// app.io = io;

// ==========================================

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"], // <== this will be the URL of our React app (it will be running on port 3000)
  })
);

//routes
const event = require("./routes/event-routes");
app.use("/api", event);

const authRoutes = require("./routes/auth-routes");
app.use("/api", authRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Server started at port: ${process.env.PORT}`)
);
