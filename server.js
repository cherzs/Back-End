const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize");

require("dotenv").config();
const dashboardRoutes = require("./routes/dashboardRoute");
const userRoutes = require("./routes/userRoute");
const authRoutes = require("./routes/authRoute");
const eventRoutes = require("./routes/eventRoute");
const sequelize = require("./config/database/database");

const app = express();
const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({
  db: sequelize,
});

app.use(morgan("dev"));
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/assets", express.static("assets"));

app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    store: store,
    saveUninitialized: false,
    cookie: {
      secure: "auto",
    },
  })
);

// store.sync();

app.use("/api/dashboard", dashboardRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/event", eventRoutes);

app.listen(process.env.PORT || 7852, () => {
  console.log(`Server is running on port ${process.env.PORT || 7852}`);
});
