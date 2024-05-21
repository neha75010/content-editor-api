export default async (idUser, title, callback) => {
	callback(await Document.find({ title: new RegExp(title, 'i'), admins: idUser }))
}