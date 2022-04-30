const mongoose = require("mongoose");
const { Schema } = mongoose;

const SleepTrackerSchema = new mongoose.Schema({
	sleepTime: {
		type: String,
		required: true,
	},
	userId: {
		type: Schema.Types.ObjectId,
		ref: "UserProfile",
		default: null,
		required: true,
	},
	date: {
		type: String,
		required: true,
	},
	month: {
		type: String,
		required: true,
	},
	createdDate: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("SleepTracker", SleepTrackerSchema);
