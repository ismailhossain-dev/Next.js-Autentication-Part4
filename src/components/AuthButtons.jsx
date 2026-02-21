"use client";
import { signOut, useSession } from "next-auth/react";
import React from "react";
import LoginButton from "./LoginButton";
import Link from "next/link";

const AuthButtons = () => {
  //getting user information
  const session = useSession();
  //first session loading take and kichukon por authenticated and value gola ase
  // console.log(session);
  return (
    <div>
      <div className="flex gap-5">
        {session.status === "authenticated" ? (
          //signout call korlei signout hoye jabe
          <button onClick={() => signOut()} className="btn">
            Log Out
          </button>
        ) : (
          <>
            <LoginButton />
            <Link className="btn" href={"/register"}>
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthButtons;
