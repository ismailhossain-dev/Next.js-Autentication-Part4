// v:1 Next.js login work
// step-1 Getting Started first docs ta bosaichi ekane kichu cut kore set korsi
// step-2 Getting Started/here/Using Credentials/fist docs teke copy kore CredentialsProvider bosabo
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/lib/dbConnect";
//create demon user
//dynamic user create
// const userList = [
//   { name: "sabbir", password: "1234" },
//   { name: "dablu", password: "1234" },
//   { name: "bablu", password: "1234" },
// ];
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Enter your email" },
        password: { label: "Password", type: "password", placeholder: "Enter your password" },
      },
      async authorize(credentials, req) {
        //my code
        const { email, password, secretCode } = credentials;
        //uporer user teke check kortechi
        // const user = userList.find((u) => u.name === username);

        //ekon check korbo database email ta ase kina
        const user = await dbConnect("users").findOne({ email });
        //if !user => err dive
        if (!user) {
          return null;
        }
        // const isPasswordOk = user.password === password;
        //mongodb password sathe match korbo karon amra bcryptjs use kortechi has password

        //match password first password ta credentials teke asche
        //user password ta mongodb teke astechi
        const isPasswordOk = await bcrypt.compare(password, user.password);

        //password ok takle user return hobe
        if (isPasswordOk) {
          return user;
        }
        //uporer sob kaj korle login hobe
        //my own login logic

        return null;
      },
    }),
  ],

  //user ke jodi block kori and jodi user abr login korte chay tahole login hobe na
  //callback amr role diye validation kortechi
  callbacks: {
    async jwt({ token, user }) {
      // 'user' is only available the very first time (at login)
      //user ta database teke asteche
      if (user) {
        token.role = user.role;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      // Pass the role from the token into the session user object
      if (session.user) {
        session.user.role = token.role;
      }
      return session;
    },
  },
  //
};

const handler = NextAuth(authOptions);
//next auth getting started/Initialization tke handler disi eta na dile login page run hobe error dive
export { handler as GET, handler as POST };
