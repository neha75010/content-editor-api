import cors from "cors";

export const options = {
    credentials: true,
    origin: ["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost", "http://127.0.0.1"],
    methods: ["GET", "POST"],
    optionsSuccessStatus: 200,
};

export default cors;