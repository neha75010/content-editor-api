import env from './dotenv.js';
const { MONGODB_USR, MONGODB_PSWD, DB_CLUSTER, APP_NAME } = env;

import { ObjectId } from "mongodb";
import { mongoose } from "mongoose";
const { Schema } = mongoose;

await mongoose.connect(`mongodb+srv://${MONGODB_USR}:${MONGODB_PSWD}@${DB_CLUSTER}.mongodb.net/OMC_DB?retryWrites=true&w=majority&appName=${APP_NAME}`);
//await mongoose.connect(`mongodb://127.0.0.1:27017/OMC_DB`);

export default mongoose;
export { Schema, ObjectId }