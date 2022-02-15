const mongoose = require("mongoose");

const DoctorignUpSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	createdDate: {
		type: Date,
		default: Date.now,
	},
	updatedDate: {
		type: Date,
	},
});

module.exports = mongoose.model("DoctorignUp", DoctorignUpSchema);
