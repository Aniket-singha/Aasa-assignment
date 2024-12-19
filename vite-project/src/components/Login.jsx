import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const Login = () => {
 const [email,setEmail]=useState('');
 const [password,setPassword]=useState('');
 const {currentUser,setCurrentUser}=useUser();
 const navigate=useNavigate()
const handleSubmit=async(e)=>{
  e.preventDefault();

  if (!email || !password) {
    alert("Please fill in all fields");
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include", 
    });

    const data = await response.json();

    if (data.status==='success') {
      console.log("Login successful:", data);
      localStorage.setItem('user',JSON.stringify({email:data.data.email,username:data.data.username}));
      setCurrentUser({email:data.data.email,username:data.data.username})
      
      navigate("/");
    } else {
      console.error("Login failed:", data.message);
      alert(data.message || "Invalid email or password");
    }
  } catch (error) {
    console.error("Error during login:", error);
    alert("An error occurred. Please try again.");
  }
};


  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center mb-6">Welcome</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <button
           
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            New Here?{" "}
            <Link
              to="/signup"
              className="text-blue-500 font-medium hover:underline"
            >
              Sign up now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;