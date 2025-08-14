import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem('userId', response.data.userId);
      localStorage.setItem('userRole', response.data.role);

      if (response.data.role === 'ADMIN') {
        navigate('/admin');
      } else if (response.data.role === 'INSTRUCTOR') {
        navigate('/staff');
      } else if (response.data.role === 'STUDENT') {
        navigate('/student'); 
      } else {
        setError("Unknown user role received from server.");
      }

    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Login failed. Please check your connection and try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center "
      style={{ 
          backgroundImage: "url('https://images.pexels.com/photos/3807746/pexels-photo-3807746.jpeg')",
          backgroundSize:"cover",
          backgroundRepeat: "no-repe",
      }}
    >
      {/* Marquee Container - Now at the top */}
      <div className="marquee-container-top">
          <p className="marquee-text">
              Welcome to the University Assignment Portal... A centralized hub for instructors and students to manage assignments seamlessly... Login with your credentials to access your dashboard...
          </p>
      </div>

      {/* Login Box */}
      <div className="w-full max-w-md bg-white/50 backdrop-blur-sm p-8 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-[1.02]">
        <h1 className="text-3xl font-bold text-center text-dark-purple mb-6">Login to Portal</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-black">Email (User ID)</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 p-3 border border-black rounded-lg focus:ring-2 focus:ring-dark-purple"
              disabled={loading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black">Password</label>
            <p className="text-xs text-black">For students, this is your Date of Birth (YYYY-MM-DD).</p>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 p-3 border border-black rounded-lg focus:ring-2 focus:ring-dark-purple"
              disabled={loading}
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button type="submit" className="w-full bg-dark-purple text-white p-3 rounded-lg font-bold hover:bg-opacity-90 transition-transform transform hover:-translate-y-1" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
