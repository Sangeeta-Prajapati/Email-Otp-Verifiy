import express from 'express';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import User from '../models/User.models.js';  

const router = express.Router();

// Function to send OTP email
const sendOTP = async (email, otp) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASSWORD,
        },
    });
 
    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: email,
        subject: 'Email Verification - OTP',
        text: `Your OTP code is: ${otp}`,
    };
 
    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};
 
// Register route
router.post('/register', async (req, res) => {
    const { name, email, password, phone } = req.body;
 
    try {
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }
 
        // Create a new user (store OTP in the DB for later verification)
        const otp = crypto.randomInt(100000, 999999);  // Generate OTP
        user = new User({ name, email, password, phone, otp });
        await user.save();
 
        // Send OTP to the user's email
        await sendOTP(email, otp);
 
        res.status(200).json({ message: 'Registration successful. Please verify your email with the OTP.' });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
 
// OTP verification route
router.post('/verify-otp', async (req, res) => {
    const { email, otp } = req.body;
 
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
 
        // Log the OTPs for debugging
        console.log(`Stored OTP: ${user.otp}, Entered OTP: ${otp}`);
 
        // Ensure both stored OTP and entered OTP are of the same type (number or string)
        if (parseInt(user.otp) === parseInt(otp, 10)) {
            // OTP verified successfully
            user.otpVerified = true;  // Assuming you have a flag for OTP verification
            await user.save();
 
            res.status(200).json({ message: 'OTP verified successfully. You can now login.' });
        } else {
            res.status(400).json({ message: 'Invalid OTP. Please try again.' });
        }
    } catch (error) {
        console.error('Error during OTP verification:', error);
        res.status(500).json({ message: 'Server error during OTP verification' });
    }
});
 
export default router;