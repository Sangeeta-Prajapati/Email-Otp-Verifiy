import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
// import User from '../models/User.models.js';

export const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Authorization header

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    // Verify token logic (using JWT or other methods)
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = decoded; // Add user data to request
        next(); // Proceed to the next middleware or route handler
    });
};
