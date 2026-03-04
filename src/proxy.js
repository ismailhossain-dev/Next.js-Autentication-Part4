//next proxy use
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function proxy(req) {
  //user token ta access kokrtechi
  //token morde by default kichu ekta dithe hoy tai object disi
  const token = await getToken({ req });
  console.log("hello mama", token);
  return NextResponse.next();
}

export const config = {
  //private page ke set kore disi
  matcher: ["/private/:path", "/private"],
};
