//next proxy use for private route work
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
//my code
const privateRouters = ["/private", "/secret", "/admin"];
export async function proxy(req) {
  //user token ta niye astechi and token ta amake object hisaabe dive
  const token = await getToken({ req });
  console.log("TOKEN", token);
  //etar mardome pathName ta dekte pabo
  const reqPath = req.nextUrl.pathname;

  //my code
  // console.log("hello mama", token);
  const isAuthenticated = Boolean(token);
  //check user kina
  const isUser = token?.role === "user";
  //up er privateRouter sathe private patch ta match kortese kina check
  const isPrivate = privateRouters.some((route) => reqPath.startsWith(route)); //console holo true
  console.log("hello", isAuthenticated, isUser, reqPath, isPrivate); //true

  //req.url holo http://localhost:3000
  //user login nei but user private page jete chaile login pate e patai dive user ke
  if (!isAuthenticated && isPrivate) {
    const loginUrl = new URL("/api/auth/signin", req.url);
    //user login hoyer por jey page jayte chaibe sei page e niye jabo
    loginUrl.searchParams.set("callbackUrl", reqPath);
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/private/:path*", "/admin/:path*", "/secret/:path*"],
};
