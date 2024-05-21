export default async (id, title, callback) => {
	const doc = new Document({
		founder: id,
		admins: [id],
		doc: [],
		title: title === "" ? undefined : title
	});

	await doc.save();
	callback(await doc._id);
}