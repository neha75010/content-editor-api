import mongoose, {ObjectId, Schema} from '../config/mongoose.js';

export const User = mongoose.model('users', new Schema({
	username: String,
	password: String,
}));