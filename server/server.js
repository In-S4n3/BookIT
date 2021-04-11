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
    secret: "ironducks jumping through the mountains",
    resave: true,
    saveUninitialized: true,
    ttl: 60 * 60 * 24,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 60000000,
    },
  })
);
app.set("trust proxy", 1); // trust first proxy

app.use(passport.initialize());
app.use(passport.session());

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
