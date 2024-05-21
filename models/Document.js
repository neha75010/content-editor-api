import mongoose, {ObjectId, Schema} from '../config/mongoose.js';

export const Document = mongoose.model('documents', new Schema({
	founder: ObjectId,
	admins: [ObjectId],
	title: String,
	doc: Object,
	date: { type: Date, default: Date.now }
}));