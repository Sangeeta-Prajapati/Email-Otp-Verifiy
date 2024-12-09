import express from "express";
import User from "../models/User.models.js";

const router = express.Router();

router.get("/userProfile", async (req, res) => {
    const userId = req.query.userId;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        console.log("Catch the error", error);
        res.status(500).json({ message: "Server error" });
    }
});


router.post('/updateUserProfile', async (req, res) => {
    try {
        const { userId, ...updateData } = req.body;
        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        // Find user by userId and update
        const user = await User.findByIdAndUpdate(userId, updateData, { new: true });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


export default router;
