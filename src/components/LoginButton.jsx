"use client";
import React from "react";
//next auth/Getting Started docs er last er docs tar teke import nichi
import { signIn } from "next-auth/react";
const LoginButton = () => {
  return (
    <button onClick={() => signIn()} className="btn">
      Login Now
    </button>
  );
};

export default LoginButton;
