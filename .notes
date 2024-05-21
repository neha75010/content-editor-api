import app, {upload} from './config/express.js'
import { decode } from 'jsonwebtoken';
import { Document } from './models/Document.js';

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.get('/api/open/:_id', upload.any(), async (req, res) => {
	try {
		const { params : { _id }, cookies : { token } } = req;
		const { doc } = await Document.findOne({ _id });
		console.log(_id, doc, decode(token).id);
		res.send(doc);
	} catch (error) {
		console.log(error);
	}
});

app.post('/api/save/:_id', upload.any(), async (req, res) => {
	try {
		const { body : { doc }, params : { _id }, cookies : { token } } = req;
		await Document.updateOne(
			{ _id },
			{ $set : { doc } },
			{ upsert: true }
		);
		console.log(_id, doc, decode(token).id);
		res.send(doc);
	} catch (error) {
		console.log(error);
	}
});

app.listen(80, () => console.log("Server demarré"));