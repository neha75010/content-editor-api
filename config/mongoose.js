import { ObjectId } from "mongodb";
import { mongoose } from "mongoose";
const { Schema } = mongoose;

await mongoose.connect(`mongodb://127.0.0.1:27017/CE_DB`);

export default mongoose;
export { Schema, ObjectId }