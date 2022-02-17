const mongoose = require("mongoose");

const DoctorCreateProfileSchema = new mongoose.Schema({
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
	institution: {
		type: String,
		required: true,
	},
	slmcNo: {
		type: String,
		required: true,
	},
	clinic: {
		type: String,
		required: true,
	},
	contactNo: {
		type: String,
		required: true,
	},
	nic: {
		type: String,
		required: true,
	},
	userLink: [
		{ type: Schema.Types.ObjectId, ref: "UserProfile", default: null },
	],
	isChannel: {
		type: Boolean,
		default: false,
	},
	createdDate: {
		type: Date,
		default: Date.now,
	},
	updatedDate: {
		type: Date,
	},
});

module.exports = mongoose.model("DoctorProfile", DoctorCreateProfileSchema);
