"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(password != confirmPassword){
        alert("passwords do not match");
        return;
    }
    try {
        const res = await fetch("api/auth/register",{
            method:"POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            })
        });
        const data = await res.json();
        if(!res.ok){
            throw new Error(data.error || "registration failed");
        }

        console.log(data);
        router.push("/login");

    } catch (error) {
        console.log(error);
    }
  }

  return <div>
    <h1>Register</h1>
    <form onSubmit={handleSubmit}>
        <input
          placeholder="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          placeholder="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <input
          placeholder="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          required
        />
      <button type="submit">Register</button>
    </form>
    <div>
        <p>Already have an account? <a href="/login">Login</a></p>
    </div>
  </div>;
};

export default RegisterPage;
