import mongoose from 'mongoose';


const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
    },
    // password need to be defined as model before saved 
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
    },
    address: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    pincode: {
        type: String,
    },
    otp: {
        type: String,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    verficationToken: {
        type: String,
    },
    token: {
        type: String,
    },
}, { timestamps: true });

const User = mongoose.model("User", UserSchema)
export default User;

