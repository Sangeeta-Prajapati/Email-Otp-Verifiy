import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [showOtpInput, setShowOtpInput] = useState(false);
    const navigate = useNavigate();

    // const handleSignup = async (e) => {
    //     e.preventDefault();

    //     if (!email || !username || !password) {
    //         toast.error("All fields are required");
    //         return;
    //     }
    //     if (password !== confirmPassword) {
    //         toast.error("Password doesn't match");
    //         return
    //     }

    //     try {
    //         const response = await axios.post("/api/signup", { username, email, password });
    //         if (response.status === 201) {
    //             toast.success(response.data.message);
    //             setShowOtpInput(true);
    //         }
    //     } catch (error) {
    //         toast.error(error.response?.data?.message || "Signup failed");
    //     }
    // };

    const handleSignup = async (e) => {
        e.preventDefault();
   
        if (!email || !username || !password) {
            toast.error("All fields are required");
            return;
        }
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
   
        try {
            const response = await axios.post("/api/signup", { username, email, password });
   
            // Process success response
            if (response.status === 201) {
                toast.success(response.data.message);
                setShowOtpInput(true);
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Signup failed";
            console.error("Signup error:", errorMessage);
            toast.error(errorMessage);
        }
    };

    const handleOtpVerification = async (e) => {
        e.preventDefault();

        if (!otp) {
            toast.error("Please enter the OTP");
            return;
        }

        try {
            const response = await axios.post("/api/verify-otp", { email, otp });
            if (response.status === 200) {
                toast.success(response.data.message);
                setTimeout(() => {
                    navigate("/");
                }, 1500)
                const authToken = response.data.token;
                localStorage.setItem("authToken", authToken, true, true);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "OTP verification failed");
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-form-wrapper">
                <center><h2>Sign Up</h2></center>
                <ToastContainer />
                {!showOtpInput ? (
                    <form onSubmit={handleSignup}>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <button type="submit">Sign Up</button>
                    </form>
                ) : (
                    <form onSubmit={handleOtpVerification}>
                        <input
                            type="text"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                        <button type="submit">Verify OTP</button>
                    </form>
                )}
            </div>
        </div>
    );
}
