export default async (idUser, callback) => {
	callback(await Document.find({ admins: idUser }))
}