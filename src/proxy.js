import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function proxy(req) {
  const token = await getToken({ req });
  console.log(token);
  //   return NextResponse.redirect(new URL("/home", request.url));

  //sob route ke naw
  return NextResponse.next();
}
