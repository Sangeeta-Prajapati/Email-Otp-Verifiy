import User from "../models/User.models.js";
import nodemailer from "nodemailer";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.SEND_MAIL,
        pass: process.env.MAIL_PASS
    }
})

// export const signupHandler = async (req, res) => {
//     const { email, username, password } = req.body;
//     const otp = Math.floor(1000 + Math.random() * 9000).toString();

//     try {
//         const existingUser = await User.findOne({ email });

//         if (existingUser) {
//             return res.status(400).json({ message: "User already existed" });
//         }

//         const newUser = new User({ email, otp, username, password });
//         await newUser.save();

//         // Send OTP via email
//         const mailOptions = {
//             from: process.env.SEND_MAIL,
//             to: email,
//             subject: "Thanks for Signing up in ...    Here is your OTP code",
//             text: `Hey ${username} welcome to the Home... , Your OTP for verification code is ${otp}`
//         };

//         await transporter.sendMail(mailOptions);
//         res.status(201).json({ message: "User Registered Successfully, An OTP has been sent" });

//     } catch (error) {
//         res.status(500).json({ message: "Failed to process the request", error });
//     }
// };

export const signupHandler = async (req, res) => {
    const { email, username, password } = req.body;
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
 
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
 
        const newUser = new User({ email, otp, username, password });
        await newUser.save();
 
        // Send OTP via email
        const mailOptions = {
            from: process.env.SEND_MAIL,
            to: email,
            subject: "Welcome! Here's Your OTP",
            text: `Hello ${username}, your OTP for verification is ${otp}.`
        };
 
        await transporter.sendMail(mailOptions);
 
        // Respond only if both user is saved and email is sent
        res.status(201).json({ message: "User registered successfully. OTP sent." });
    } catch (error) {
        console.error("Signup error:", error.message);
        res.status(500).json({ message: "Failed to process the request", error: error.message });
    }
};

export const verifyOtpHandler = async (req, res) => {
    const { email, otp, username } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        console.log("User found:", user);

        if (user.otp === otp) {
            user.isVerified = true;
            user.otp = null;
            const token = jwt.sign({
                email: user.email,
                isVerified: true,
                userId: user._id
            }, process.env.JWT_SECRET);

            user.token = token;
            await user.save();
            // console.log("Token generated:", token);
            return res.status(200).json({ message: "OTP verified successfully", token });
        } else {
            return res.status(400).json({ message: "Invalid OTP" });
        }
    } catch (err) {
        console.error("Error during OTP verification:", err);
        return res.status(500).json({ message: "Failed to verify user", error: err.message });
    }
};


export const signinHandler = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: "User not found" });
        }
        if (existingUser.password !== password) {
            return res.status(400).json({ message: "Invalid Email or Password" });
        }
        const token = jwt.sign(
            { email: existingUser.email, userId: existingUser._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        return res.status(200).json({ message: "Sign-in successful", token });
    } catch (error) {
        console.error("Sign-in error:", error.message);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

