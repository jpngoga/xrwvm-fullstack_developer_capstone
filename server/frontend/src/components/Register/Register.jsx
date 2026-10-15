import React, { useState } from "react";
import "./Register.css";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8003";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus({ type: "", message: "" });
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/api/users/register/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.detail || "Registration failed. Check your details and try again.");
      }

      setStatus({
        type: "success",
        message: data.message || "Registration successful. You can now log in.",
      });
      setForm({
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        password: "",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "Could not connect to the Django server.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="register-page">
      <nav className="register-nav" aria-label="Main navigation">
        <a className="register-brand" href="../../../index.html">Best Cars Dealership</a>
        <div className="register-nav-links">
          <a href="../../../index.html">Home</a>
          <a href="../../static/About.html">About Us</a>
          <a href="../../static/Contact.html">Contact Us</a>
          <a href="/login.html">Login</a>
        </div>
      </nav>

      <section className="register-layout">
        <div className="register-intro">
          <span className="register-eyebrow">JOIN OUR COMMUNITY</span>
          <h1>Find your next great drive.</h1>
          <p>Create an account to explore dealerships and share your car-buying experiences with other drivers.</p>
          <ul>
            <li>Discover dealerships</li>
            <li>Read customer reviews</li>
            <li>Share your own experience</li>
          </ul>
        </div>

        <div className="register-card">
          <h2>Create your account</h2>
          <p className="register-subtitle">Fill in all five fields to sign up.</p>

          {status.message && (
            <div className={`register-alert ${status.type}`} role="status">
              {status.message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="register-field">
              <label htmlFor="username">Username</label>
              <input id="username" name="username" value={form.username} onChange={handleChange} autoComplete="username" required />
            </div>
            <div className="register-name-row">
              <div className="register-field">
                <label htmlFor="first_name">First Name</label>
                <input id="first_name" name="first_name" value={form.first_name} onChange={handleChange} autoComplete="given-name" required />
              </div>
              <div className="register-field">
                <label htmlFor="last_name">Last Name</label>
                <input id="last_name" name="last_name" value={form.last_name} onChange={handleChange} autoComplete="family-name" required />
              </div>
            </div>
            <div className="register-field">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" value={form.email} onChange={handleChange} autoComplete="email" required />
            </div>
            <div className="register-field">
              <label htmlFor="password">Password</label>
              <input id="password" name="password" type="password" value={form.password} onChange={handleChange} autoComplete="new-password" minLength={8} required />
              <small>Use at least 8 characters.</small>
            </div>
            <button className="register-submit" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating account…" : "Register"}
            </button>
          </form>

          <p className="register-login">Already registered? <a href="/login.html">Login</a></p>
        </div>
      </section>
      <footer className="register-footer">© 2026 Best Cars Dealership</footer>
    </main>
  );
}
