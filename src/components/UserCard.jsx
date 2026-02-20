"use client";
//ekane basically amra ekane login kora user information gola dekabo
// v:3 amra component take root page dekaysi
import { useSession } from "next-auth/react";
import React from "react";

const UserCard = () => {
  //getting started  Frontend - Add React Hook docs
  const session = useSession();
  //session amr user login value gola pabo
  // console.log(session);
  return (
    <div>
      <h2 className="font-bold">User- Client</h2>
      {/* session take stringify hisabe dekbo */}
      <div className="border-2 p-4 rounded">{JSON.stringify(session)}</div>
    </div>
  );
};

export default UserCard;
