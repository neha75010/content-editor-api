import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors, { options } from "./cors.js";

export const app = express();
import "express-group-routes";
app.use(cors(options));
export const httpServer = createServer(app);
export const io = new Server(httpServer, { cors: options });

import bodyParser from "body-parser";
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

import cookieParser from "cookie-parser";
app.use(cookieParser());