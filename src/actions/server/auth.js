//I am writing sever code here for form and work register
"use server";

import { dbConnect } from "@/lib/dbConnect";
import bcrypt from "bcryptjs";
//postUser ta RegisterFrom from use korsi and postUser ja kichu disilam segola payload hisabe ekane paitechi
export const postUser = async (payload) => {
  // clg ta terminal dekabe
  // console.log(payload);

  //Register from perfect korar jorno 3 ta kaj korbo
  //1.check user exist or not //use ase kina nai seta check korsi findOne er mardome
  const isExist = await dbConnect("users").findOne({ email: payload.email });
  if (isExist) {
    return {
      success: false,
      message: "user already existed",
    };
  }
  //2.user jodi nake create new user korbo
  //ferdous vai github teke deke krsi
  //password ta ei kora hoyse just security jorno jathe password dekle o hack korthe na pare
  const hashPassword = await bcrypt.hash(payload.password, 10);
  //   console.log(hashPassword);
  const newUser = {
    //payload sob kichu data naw and aro kichu add koro
    ...payload,
    createAt: new Date().toISOString(),
    role: "user",
    password: hashPassword,
  };
  console.log(newUser);
  //3.send  user to database
  const result = await dbConnect("users").insertOne(newUser);
  if (result.acknowledged) {
    return {
      success: true,
      message: `user createed with ${result.insertedId.toString()}`,
    };
  } else {
    return {
      success: false,
      message: "something was wrong",
    };
  }
};
