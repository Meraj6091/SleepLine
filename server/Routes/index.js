const express = require("express");
const DoctorProfile = require("../Models/doctorProfile");
const DoctorignUpSchema = require("../Models/doctorSignUpModel");
const medicalRecords = require("../Models/medicalRecords");
const sleepTracker = require("../Models/sleepTracker");
const userProfile = require("../Models/userProfile");
const UserProfile = require("../Models/userProfile");
const router = express.Router();
const UsersignUpSchema = require("../Models/userSignUpModel");

router.post("/signupUser", async (req, res) => {
	try {
		let obj = {
			newUser: "",
			signUpUser: "",
		};
		const findUser = await UsersignUpSchema.findOne({
			email: req.body.email,
		});
		if (findUser) {
			obj.newUser = false;
			return res.json(obj);
		} else {
			obj.newUser = true;
			console.log(req.body);
			const signUpUser = await new UsersignUpSchema(req.body);
			signUpUser.save().then((data) => {
				console.log(signUpUser);
				obj.signUpUser = signUpUser;
				return res.json(obj);
			});
		}
	} catch (err) {
		console.log(err);
		return res.json(err);
	}
});
module.exports = router;

router.post("/signupDoc", async (req, res) => {
	try {
		let obj = {
			newUser: "",
			signUpUser: "",
		};
		const findUser = await DoctorignUpSchema.findOne({
			email: req.body.email,
		});
		if (findUser) {
			obj.newUser = false;
			return res.json(obj);
		} else {
			obj.newUser = true;
			console.log(req.body);
			const signUpDoc = await new DoctorignUpSchema(req.body);
			signUpDoc.save().then((data) => {
				obj.signUpUser = signUpDoc;
				return res.json(obj);
			});
		}
	} catch (err) {
		console.log(err);
		return res.json(err);
	}
});

//loggin

router.post("/logIn", async (req, res) => {
	try {
		console.log(req.body);

		if (req.body.doctor) {
			const logIn = await DoctorignUpSchema.findOne({
				firstName: req.body.firstName,
				password: req.body.password,
			});
			console.log(logIn);
			if (logIn) {
				return res.json(logIn);
			} else {
				console.log(false);
				return res.json(false);
			}
		} else {
			const logIn = await UsersignUpSchema.findOne({
				firstName: req.body.firstName,
				password: req.body.password,
			});
			console.log(logIn);
			if (logIn) {
				return res.json(logIn);
			} else {
				console.log(false);
				return res.json(false);
			}
		}
	} catch (err) {
		console.log(err);
		return res.json(err);
	}
});

//create user profile

router.post("/userCreateProfile", async (req, res) => {
	try {
		console.log(req.body);
		const createProfile = await new UserProfile(req.body);
		createProfile.save().then((data) => {
			console.log(createProfile);
			return res.json(createProfile);
		});
	} catch (err) {
		console.log(err);
		return res.json(err);
	}
});

//create doc profile

router.post("/docCreateProfile", async (req, res) => {
	try {
		console.log(req.body);
		const createProfile = await new DoctorProfile(req.body);
		createProfile.save().then((data) => {
			console.log(createProfile);
			return res.json(createProfile);
		});
	} catch (err) {
		console.log(err);
		return res.json(err);
	}
});

router.post("/getUserInfo", async (req, res) => {
	try {
		console.log(req.body);
		const userProfile = await UserProfile.find({}).where({
			firstName: req.body.user,
		});
		console.log(userProfile);

		const email = await UsersignUpSchema.find({}).where({
			firstName: req.body.user,
		});
		console.log(email);
		return res.json({ userProfile, email });
	} catch (err) {
		console.log(err);
		return res.json(err);
	}
});

router.post("/getAllDocInfo", async (req, res) => {
	try {
		console.log(req.body);
		const docProfile = await DoctorProfile.findOne({
			firstName: req.body.user,
		}).populate("channeledUsers");

		console.log(docProfile);

		const docSignupData = await DoctorignUpSchema.find({}).where({
			firstName: req.body.user,
		});
		console.log(docSignupData);
		return res.json({ docProfile, docSignupData });
	} catch (err) {
		console.log(err);
		return res.json(err);
	}
});

router.post("/getAllDocPofiles", async (req, res) => {
	try {
		console.log(req.body);
		const docProfile = await DoctorProfile.find({});
		console.log(docProfile);

		const docSignupData = await DoctorignUpSchema.find({});
		console.log(docSignupData);
		return res.json(docProfile);
	} catch (err) {
		console.log(err);
		return res.json(err);
	}
});

//channel doctor
router.post("/docChannel", async (req, res) => {
	try {
		console.log(req.body);
		const channled = await DoctorProfile.findOneAndUpdate(
			{ _id: req.body.docId },
			{ $push: { channeledUsers: req.body._id } }
		);
		console.log(channled);
		return res.json(channled);
	} catch (err) {
		console.log(err);
		return res.json(err);
	}
});

router.post("/isChanneled", async (req, res) => {
	try {
		console.log(req.body);
		const isChanneled = await DoctorProfile.find({
			channeledUsers: { $in: [req.body.userId] },
		});
		console.log(isChanneled);
		return res.json(isChanneled);
	} catch (err) {
		console.log(err);
		return res.json(err);
	}
});

//medical records
router.post("/crateMedicalRecords", async (req, res) => {
	try {
		console.log(req.body);
		const crateMedicalRecords = await new medicalRecords(req.body);
		crateMedicalRecords.save().then((data) => {
			console.log(crateMedicalRecords);
			return res.json(crateMedicalRecords);
		});
	} catch (err) {
		console.log(err);
		return res.json(err);
	}
});

//get user medical Records
router.post("/getUserMedicalRecords", async (req, res) => {
	try {
		console.log(req.body);
		const getMedicalRecords = await medicalRecords.find({
			docId: req.body.docId,
			userId: req.body.userId,
		});
		console.log(getMedicalRecords);

		return res.json(getMedicalRecords);
	} catch (err) {
		console.log(err);
		return res.json(err);
	}
});

//update medical record

router.post("/updateMedicalRecord", async (req, res) => {
	try {
		console.log(req.body);
		const updateMedicalRecord = await medicalRecords
			.updateOne(req.body)
			.where({ _id: req.body.id });
		console.log(updateMedicalRecord);

		return res.json(updateMedicalRecord);
	} catch (err) {
		console.log(err);
		return res.json(err);
	}
});
router.post("/deleMedicalRecord", async (req, res) => {
	try {
		console.log(req.body);
		const deleMedicalRecord = await medicalRecords.deleteOne({
			_id: req.body.id,
		});

		console.log(deleMedicalRecord);

		return res.json(deleMedicalRecord);
	} catch (err) {
		console.log(err);
		return res.json(err);
	}
});

router.post("/getAllDoctorMedicalRecords", async (req, res) => {
	try {
		console.log(req.body);
		const getMedicalRecords = await medicalRecords.find({
			docId: req.body.docId,
		});
		console.log(getMedicalRecords);

		return res.json(getMedicalRecords);
	} catch (err) {
		console.log(err);
		return res.json(err);
	}
});

router.post("/getUserMedicalRecord", async (req, res) => {
	try {
		console.log(req.body);
		const getMedicalRecords = await medicalRecords.find({
			userId: req.body.userId,
		});
		console.log(getMedicalRecords);

		return res.json(getMedicalRecords);
	} catch (err) {
		console.log(err);
		return res.json(err);
	}
});
//save user sleep time

router.post("/createSleepTime", async (req, res) => {
	try {
		console.log(req.body);
		const createSleepTime = await new sleepTracker(req.body);
		createSleepTime.save().then((data) => {
			console.log(createSleepTime);
			return res.json(createSleepTime);
		});
	} catch (err) {
		console.log(err);
		return res.json(err);
	}
});

router.post("/getAllSleepInfo", async (req, res) => {
	try {
		console.log(req.body);
		const getAllSleepInfo = await sleepTracker.find({
			userId: req.body.userId,
		});
		console.log(getAllSleepInfo);

		return res.json(getAllSleepInfo);
	} catch (err) {
		console.log(err);
		return res.json(err);
	}
});

router.post("/updateProfile", async (req, res) => {
	try {
		console.log(req.body);
		let updatePassCode;
		const updateProfile = await userProfile
			.updateOne(req.body)
			.where({ _id: req.body.id });
		console.log(updateProfile);
		if (req.body.password && req.body.confirmPassword) {
			updatePassCode = await UsersignUpSchema.updateOne(req.body).where({
				_id: req.body.signUpId,
			});
		}
		if (updateProfile || updatePassCode) return res.json(true);
	} catch (err) {
		console.log(err);
		return res.json(err);
	}
});

router.post("/updateDocProfile", async (req, res) => {
	try {
		console.log(req.body);
		let updatePassCode;
		const updateProfile = await DoctorProfile.updateOne(req.body).where({
			_id: req.body.id,
		});
		console.log(updateProfile);
		if (req.body.password && req.body.confirmPassword) {
			updatePassCode = await DoctorignUpSchema.updateOne(req.body).where({
				_id: req.body.signUpId,
			});
		}
		if (updateProfile || updatePassCode) return res.json(true);
	} catch (err) {
		console.log(err);
		return res.json(err);
	}
});
//test
router.post("/img-upload", async (req, res) => {
	try {
		console.log(req.body);
		return res.json();
	} catch (err) {
		console.log(err);
		return res.json(err);
	}
});
module.exports = router;
