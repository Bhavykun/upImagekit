"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const resultres = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (resultres?.error) {
      console.log(resultres.error);
    } else {
      router.push("/");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <div>
        {/* <button onClick={() => signIn("github")}>Sign in with Google</button> */}
        Don't have an account?{" "}
        <button onClick={() => router.push("/register")}>Register</button>
      </div>
    </div>
  );
};

export default LoginPage;
