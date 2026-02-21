//V:1, 2 Next auth all Login work
import { dbConnect } from "@/lib/dbConnect";
import { compare } from "bcryptjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // Sign in with {name} button
      name: "Email & Password",
      //form input
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Enter Email" },
        password: { label: "Password", type: "password", placeholder: "Enter Password" },
      },
      //form submit value gola ekane pabo
      async authorize(credentials, req) {
        const { email, password } = credentials;
        // console.log("Login attempt:", email);

        // find user in MongoDB
        const user = await dbConnect("users").findOne({ email });

        if (!user) return null; // user not found

        // compare password (plain vs hashed)
        const isPasswordOk = await compare(password, user.password);

        if (!isPasswordOk) return null; // password mismatch

        // login success
        return user;
      },
    }),

    //finished
  ],

  //Configuration/Options callback docs next auth website
  callbacks: {
    //amra jodi user block kori then user jodi abr register korthe chai tahole amra take easy teke bole divo register kora jabe na user user information add true kore dive hove v:5:9:11second
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    //login kora pore user kothay nivo seta ekane bolvo and baseUrl ta holo NextAuth er
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    //session and jwt te amra user data add kori jathe website secure hoy
    async session({ session, token, user }) {
      //secure jorno amra kokono user teke data add kori . amra token teke data add kori
      if (token) {
        token.role = token.role;
      }

      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      //my code
      //amra just login korte gele bujbo jwt kaj ta hoyche kina amra jodi deki role add hoyche ui te tahole bujvo kaj ta hoyche
      if (user) {
        ((token.email = user.email), (token.role = user.role));
      }
      //
      return token;
    },
  },
};

const handler = NextAuth(authOptions);

// Initialization Next Auth use
export { handler as GET, handler as POST };
