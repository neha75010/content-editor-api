import mongoose, {ObjectId, Schema} from '../config/mongoose.js';

export const Document = mongoose.model('documents', new Schema({
	founder: ObjectId,
	members: [ObjectId],
	doc: String,
}));