const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const routesUrls = require("./Routes");
dotenv.config();
mongoose.connect(process.env.DATABASE_ACCESS, (err) => {
	if (err) {
		console.log(err);
	} else console.log("database connected");
});
app.use(express.json());
app.use(cors());
app.use("/app", routesUrls);
app.listen(process.env.PORT, () => console.log("server is running"));
