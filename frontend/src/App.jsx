import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/HomePage"
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Profile from "../pages/Profile";
import Header from "./headers/Header";
import Logout from "../pages/Logout";

function App() {

  return (
    <>
      <Router>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/logout" element={<Logout />} />

        </Routes>
      </Router>
    </>
  )
}

export default App




