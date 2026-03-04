"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";
//this user layout.jsx
const NextAuthProvider = ({ children }) => {
  //nextAuth / getting started/ docs
  return <SessionProvider>{children}</SessionProvider>;
};

export default NextAuthProvider;
