import { app, httpServer, io } from "./config/server.js";
import { serialize, parse } from "cookie";
import { randomID } from "./functions/index.js";
import { Document, User } from "./models/index.js";
import { initialHeaders, usersGet, documentsGet, documentSearch, documentCreate, documentGet, documentSet, userSignin, userSignup, userSignOut } from "./handlers/index.js";

io.engine.on("initial_headers", initialHeaders);
io.on('connection', async (socket) => {
    const { handshake : { headers : { cookie = "" } } } = socket;
	socket.join(`room:${parse(cookie)?.["client-id"] ?? randomID()}`);
	socket.on('cookies:read', callback => callback(parse(cookie)));
	socket.on('users:get', usersGet);
	socket.on('documents:get', documentsGet);
	socket.on('documents:search', documentSearch);
	socket.on('document:get', documentGet);
	socket.on('document:create', documentCreate);
	socket.on('document:set', documentSet);
});

app.group('/api/', api => {
	api.post('/cookies/read', (req, res) => res.send({...req.cookies}));
	api.post('/user/signin', userSignin);
	api.post('/user/signup', userSignup);
	api.post('/user/signout', userSignOut);
});

httpServer.listen(80, () => {
	console.log('server ouvert au port 80')
});