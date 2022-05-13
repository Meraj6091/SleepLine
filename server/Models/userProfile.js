const mongoose = require("mongoose");

const UsercreateProfileSchema = new mongoose.Schema({
	firstName: {
		type: String,
	},
	lastName: {
		type: String,
	},
	dateOfBirth: {
		type: String,
	},
	weight: {
		type: String,
	},
	height: {
		type: String,
	},
	bloodType: {
		type: String,
	},
	insomniaLevel: {
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
