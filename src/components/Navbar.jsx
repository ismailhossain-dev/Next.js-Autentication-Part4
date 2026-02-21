// import { signIn } from "next-auth/react";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="border-b-2  py-3 text-center space-x-5 mx-5 flex gap-4 justify-center">
      <Link href="/home">Home</Link>
      <Link href="/register">Register</Link>
      {/* <Link onClick={() => signIn()}>Login</Link> */}
      <Link href="/public">Public</Link>
      <Link href="/private">Private</Link>
      <Link href="/admin">Admin</Link>
    </div>
  );
};

export default Navbar;
