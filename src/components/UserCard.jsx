"use client";
//getting started e docs ta ase
import { useSession } from "next-auth/react";
import React from "react";
//basically eta amra use kortechi user information gola ui dekanor jorno
const UserCard = () => {
  //useSession er mardome user ke access kore
  const session = useSession();
  // console.log(session);
  return (
    <div>
      <p className="text-4xl font-bold text-center mb-3"> CLIENT USER UI </p>
      {/* session hole string e convert kore felbe */}
      <div className="border-2 p-4 rounded">{JSON.stringify(session)}</div>
    </div>
  );
};

export default UserCard;
