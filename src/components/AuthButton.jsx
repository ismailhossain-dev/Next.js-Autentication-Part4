"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import LoginButton from "./LoginButton";

const AuthButton = () => {
  const session = useSession();
  return (
    <div>
      {session.status === "authenticated" ? (
        <button onClick={() => signOut()} className="btn">
          Logout
        </button>
      ) : (
        <>
          <LoginButton></LoginButton>
          <Link href={"/register"} className="btn">
            Register
          </Link>
        </>
      )}
    </div>
  );
};

export default AuthButton;
