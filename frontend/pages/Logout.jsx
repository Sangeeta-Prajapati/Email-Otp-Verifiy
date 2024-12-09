import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Logout = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in by checking the token
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token); // Update state based on whether token exists
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove token on logout
    setIsLoggedIn(false); // Update login state to false
    navigate("/signIn", { state: { message: "Logged out successfully" } }); // Redirect to Sign In page with message
  };

  const handleSignIn = () => {
    navigate("/signIn"); // Navigate to Sign In page
  };

  return (
    <div className="logout-container">
      {isLoggedIn ? (
        <button onClick={handleLogout} className="logout-btn">
          Log out
        </button>
      ) : (
        <div>
          <p>You are not logged in.</p>
          <button onClick={handleSignIn} className="signin-btn">
            Sign In
          </button>
        </div>
      )}
    </div>
  );
};

export default Logout;
