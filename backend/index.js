import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { signupHandler, verifyOtpHandler, signinHandler } from './handlers.js/handlers.js';
// import userProfileRoutes from "./routes/userProfileRoutes.js";

import userProfileRoutes from "./routes/userProfileRoutes.js";
import connectDb from './db/connectDB.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//connection
connectDb();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.post("/api/signup", signupHandler);
app.post("/api/verify-otp", verifyOtpHandler);
app.post("/api/signin", signinHandler);

app.use("/api", userProfileRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
