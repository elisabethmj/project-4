const express = require("express");
const app = express();
const fs = require("fs");

require("dotenv").config();
const db = require("./database/db");

// const kitsController = require("./controllers/kits");
const sessionController = require("./controllers/session");
const { expressSession, pgSession } = require("./session");
const signupController = require("./controllers/signup");

const port = process.env.PORT || 3001; 



app.use(express.json());
app.use(express.static("./client/build"));

// getting session info working into the db
app.use(
	expressSession({
		resave: true,
		saveUninitialized: true,
		store: new pgSession({
			pool: db, // Connects to our postgres db
			createTableIfMissing: true, // Creates a session table in your database (go look at it!)
		}),
		secret: process.env.EXPRESS_SESSION_SECRET_KEY,
	})
);


// app.use("/api/kits", kitsController);
app.use("/api/session", sessionController);
app.use("/api/signup", signupController);


app.get("*", (req, res) => {
  res.setHeader("content-type", "text/html");
  fs.createReadStream(`${__dirname}/client/build/index.html`).pipe(res);
});



app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});


