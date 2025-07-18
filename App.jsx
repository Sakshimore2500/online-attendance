import React, { useState } from "react";
import calendar from './assets/calendar.jpg';

const Login = () => {
  const [role, setRole] = useState("Admin");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role, username, password }),
    });

    const data = await res.json();
    if (res.ok) {
      alert(`${role} Login Successful`);
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 text-white font-sans">
      <div className="flex-1 flex flex-col justify-center items-start px-10">
        <h2 className="text-4xl font-bold leading-tight mb-4">
          Sign In to <br /> Web Attendance <br /> Management System
        </h2>
        <img
          src={calendar} // ✅ imported image
          alt="calendar"
          className="w-full max-w-sm mt-6"
        />
      </div>

      <div className="flex-1 flex flex-col justify-center items-center bg-[#121212] p-10 rounded-l-3xl shadow-2xl">
        <form onSubmit={handleLogin} className="w-full max-w-md space-y-6">
          <div className="flex space-x-6 mb-4">
            {["Admin", "Teacher", "Student"].map((r) => (
              <label key={r} className="flex items-center space-x-2 text-sm">
                <input
                  type="radio"
                  value={r}
                  checked={role === r}
                  onChange={(e) => setRole(e.target.value)}
                  className="accent-red-500"
                  name="role"
                />
                <span>{r}</span>
              </label>
            ))}
          </div>

          <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 transition-colors py-3 rounded-md font-semibold text-white"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
