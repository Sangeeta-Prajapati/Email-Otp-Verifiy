import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import "../src/style/styles.css"

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/signin", { email, password });
      console.log("Signin response:", response);
      toast.success(response.data.message);
      const authToken=response.data.token;
      localStorage.setItem("authToken",authToken,true,true);
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      <center><h2>SignIn</h2></center>
      <div>
        <form action="" onSubmit={handleSignIn}>
          <ToastContainer />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">Sign In</button>
        </form>
      </div>
    </>
  )
}
