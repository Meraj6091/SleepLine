const express = require("express");
const DoctorProfile = require("../Models/doctorProfile");
const DoctorignUpSchema = require("../Models/doctorSignUpModel");
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
module.exports = router;
