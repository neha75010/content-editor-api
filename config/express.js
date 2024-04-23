import express from 'express';
import multer from 'multer';
const upload = multer({ dest: 'uploads/' });
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from 'cors';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
    cors({
        credentials: true,
        origin: ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost', 'http://127.0.0.1'],
        optionsSuccessStatus: 200,
    })
);

export default app;
export { upload }