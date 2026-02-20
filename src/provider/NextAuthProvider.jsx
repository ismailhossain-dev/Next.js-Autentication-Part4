"use client";
import { SessionProvider } from "next-auth/react";
//v:3next auth first docs get stating work
import React from "react";

const NextAuthProvider = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default NextAuthProvider;
