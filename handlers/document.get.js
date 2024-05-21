export default async (idDoc, callback) => {
	const { doc } = await Document.findOne({ _id: idDoc });
	callback(doc ?? {});
}