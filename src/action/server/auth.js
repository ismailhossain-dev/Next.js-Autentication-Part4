"use server";
// Register work
import { dbConnect } from "@/lib/dbConnect";
import bcrypt from "bcryptjs";
//amra jodi server function leki tahole must be amader ke async bole dithe hobe

//payload ta holo children er motho default value]
//post user user registerForm and jathe client teke server e data ante pari
export const postUser = async (payload) => {
  //   console.log(payload);

  //step-0 validation  my code

  //mongodb teke register data gola patanor jorno amader 3 ti kaj korthe hobe
  //ste-1: check user ase ki nai

  //check kortese use ki age teke ase kina
  const isExist = await dbConnect("users").findOne({ email: payload.email });

  if (isExist) {
    return {
      success: false,
      message: "user allready exists",
    };
  }

  //password bcrypt korbo github teke deke and password ta mongo db te has hoye jabe
  const hashPassword = await bcrypt.hash(payload.password, 10);
  //   console.log("has password", hashPassword);
  //step-2:jodi use na take tahole new user create korben
  const newUser = {
    ...payload,
    createAt: new Date().toISOString(),
    role: "user",
    password: hashPassword,
  };

  console.log("new user ", newUser);

  //step-3: sent to database
  const result = await dbConnect("users").insertOne(newUser);

  // console.log(result);

  if (result.acknowledged) {
    return {
      success: true,
      message: `user create with ${result.insertedId.toString()}`,
    }; //database jodi off take tahole else ta hobe
  } else {
    return {
      success: false,
      message: "Something went long , try again",
    };
  }
};
