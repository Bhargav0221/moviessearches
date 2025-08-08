import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [form, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log(form);
      const response = await axios.post('http://localhost:5000/user/login', {
        email: form.email,
        password: form.password,
      });

      if (response.status === 200) {
        alert("Login success");
        console.log(response.data);
         localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem("token",JSON.stringify(response.data.token));
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Login failed: " + (err.response?.data || "Unknown error"));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={form.email}
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-1" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={form.password}
            placeholder="Enter your password"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Submit
        </button>
    <span>Want an Account <a href="/" className='text-blue-500'>Go to Signup</a></span>
      </form>
      
    </div>
  );
}

export default Login;
