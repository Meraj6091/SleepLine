const mongoose = require("mongoose");
const { Schema } = mongoose;
const MedicalRecordsSchema = new mongoose.Schema({
	medicalNo: {
		type: String,
		required: true,
	},
	firstName: {
		type: String,
	},
	lastName: {
		type: String,
	},
	weight: {
		type: String,
	},
	height: {
		type: String,
	},

	remarks: {
		type: String,
	},
	docName: {
		type: String,
	},
	insomniaLevel: {
		type: String,
	},

	docId: {
		type: Schema.Types.ObjectId,
		ref: "DoctorProfile",
		default: null,
	},
	userId: {
		type: Schema.Types.ObjectId,
		ref: "UserProfile",
		default: null,
	},
	createdDate: {
		type: Date,
		default: Date.now,
	},
	updatedDate: {
		type: Date,
	},
});

module.exports = mongoose.model("MedicalRecords", MedicalRecordsSchema);
