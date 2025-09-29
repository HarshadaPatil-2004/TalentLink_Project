import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "./axiosInstance";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "", role: "freelancer" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("register/", form);
      alert("Registration successful! Please login.");
      navigate("/");
    } catch (error) {
      const errorMsg = error.response?.data?.username?.[0] || "Registration failed!";
      alert(errorMsg);
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input type="text" name="username" placeholder="Username" value={form.username} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="freelancer">Freelancer</option>
          <option value="client">Client</option>
        </select>
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <Link to="/">Login here</Link></p>
    </div>
  );
};

export default Register;
