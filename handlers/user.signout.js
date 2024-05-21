import { expireCookiesOptions } from "../constants/cookiesOptions.js";

export default function userSignOut (req, res) {
    try {
		return res.status(200).cookie("token", null, expireCookiesOptions).send({ error : false });
	} catch (error) {
		return res.status(404).send({ error: true, message: error.message });
	}
}