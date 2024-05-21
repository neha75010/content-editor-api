import { app, httpServer, io } from "./config/server.js";
import { serialize, parse } from "cookie";
import randomID from "./functions/randomID.js";
import initialHeaders from "./handlers/initialHeaders.js";
import userSignin from "./handlers/user.signin.js";
import userSignOut from "./handlers/user.signout.js";
import { Document } from "./models/Document.js";
import { User } from "./models/User.js";

io.engine.on("initial_headers", initialHeaders);

io.on('connection', async (socket) => {
    const { handshake : { headers : { cookie = "" } } } = socket;
	socket.join(`room:${parse(cookie)?.["client-id"] ?? randomID()}`);

	socket.use(([event, ...args], next) => {
		console.log(event, args)
		next();
	})

	socket.on('cookies:read', callback => callback(parse(cookie)));
	socket.on('users:get', async callback => {
		callback(await User.find({}))
	});
	socket.on('user:signup', callback => {});
	socket.on('user:signout', callback => {});
	socket.on('documents:get', async (idUser, callback) => {
		callback(await Document.find({ admins: idUser }))
	});
	socket.on('documents:search', async (idUser, title, callback) => {
		callback(await Document.find({ title: new RegExp(title, 'i'), admins: idUser }))
	});
	socket.on('document:get', async (idDoc, callback) => {
		const { doc } = await Document.findOne({ _id: idDoc });
		callback(doc ?? {});
	});
	socket.on('document:create', async (id, title, callback) => {
		const doc = new Document({
			founder: id,
			admins: [id],
			doc: [],
			title: title === "" ? undefined : title
		});

		await doc.save();
		callback(await doc._id);
	});
	socket.on('document:set', async (idDoc, newDoc) => {
		const doc = await Document.updateOne({_id: idDoc}, {doc: newDoc, date: Date.now()});
		//callback(doc);
	});
});

app.group('/api/', api => {
	api.post('/cookies/read', (req, res) => res.send({...req.cookies}));
	api.post('/user/signin', userSignin);
	api.post('/user/signout', userSignOut);
});

httpServer.listen(80, () => {
	console.log('server ouvert au port 80')
});