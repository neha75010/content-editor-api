import { Document } from "../models/Document.js";

export default async (idDoc, newDoc) => {
	const doc = await Document.updateOne({_id: idDoc}, {doc: newDoc, date: Date.now()});
	//callback(doc);
}