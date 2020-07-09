const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);
const db = require("./database/config");
const usersRouter = require("./users/users-router");

const server = express();
const port = process.env.PORT || 6666;

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(
  session({
    resave: false, // avoids recreating sessions that have not changed
    saveUninitialized: false, // comply with GDPR laws
    secret: "keep it secret, keep it safe",
    store: new KnexSessionStore({
      knex: db, // configured instance of Knex, or the 'live database connection'
      createtable: true, // This will create a new table if one doesn't exist to store the sessions
    }),
  })
);

server.use(usersRouter);

server.use((err, req, res, next) => {
  console.log(err);

  res.status(500).json({
    message: "Server could not respond to request...",
  });
});

server.listen(port, () => {
  console.log(`Running at http://localhost:${port}`);
});
