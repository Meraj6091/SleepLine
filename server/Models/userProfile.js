const mongoose = require("mongoose");

const UsercreateProfileSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	dateOfBirth: {
		type: String,
		required: true,
	},
	weight: {
		type: String,
		required: true,
	},
	height: {
		type: String,
		required: true,
	},
	bloodType: {
		type: String,
	},
	createdDate: {
		type: Date,
		default: Date.now,
	},
	updatedDate: {
		type: Date,
	},
});

module.exports = mongoose.model("UserProfile", UsercreateProfileSchema);
