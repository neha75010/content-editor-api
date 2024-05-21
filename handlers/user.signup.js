import { cookiesOptions } from "../constants/cookiesOptions.js";
import { jwtKey } from "../constants/jwtKey.js";
import chadLock from "../functions/chadLock.js";
import { User } from "../models/User.js";
import jwt from "jsonwebtoken"

export default async function userSignup (req, res) {
	const {username = "", password = "", passwordC = ""} = req.body;
	try {
		if(username === '') { throw new Error('empty_iden'); return; }
		if(password === '') { throw new Error('empty_pswd'); return; }
		if(passwordC === '') { throw new Error('empty_pswdC'); return; }

		const findUserByName = await User.findOne({username});
		if(findUserByName !== null) { throw new Error('account_exists'); return; }
		const confirmPassword = passwordC === password;
		if(confirmPassword === false) { throw new Error('password_dont_match'); return; }

		const user = new User({
			username,
			password: chadLock(password),
		});

		await user.save();

		const token = jwt.sign({ id: user._id.toString() }, jwtKey, { expiresIn: "3y" });
		return res.status(200)
			.cookie("token", token, cookiesOptions)
			.send({ error : false, message : "signup", id: findUserByName._id });
	} catch (error) {
		return res.status(200).send({ error : true, message : error.message });
	}		
}

//c9b2bc376d750b6ca138f67054098c0a