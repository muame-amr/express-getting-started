require("dotenv").config();

const express = require("express");
const app = express();

const mongoose = require("mongoose");
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });
const db = mongoose.connection;

db.on("error", (error) => console.error("connection error:", error));
db.once("open", () => console.log("connected to database"));

app.use(express.json());

const route = require("./routes/subscribers");

app.use("/subscribers", route);

app.listen(5000, () => {
	console.log("Server started on port 5000");
});
