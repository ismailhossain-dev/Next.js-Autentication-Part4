//V:1, 2 Next auth all Login work
import { dbConnect } from "@/lib/dbConnect";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
//password ta hash chilo tai amra password ekane condition chalite partechi tai amra ferdous vai github teke eta antechi
import bcrypt from "bcryptjs";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // Sign in with {name} button
      name: "Email & Password",
      //form input
      credentials: {
        email: { label: "email", type: "email", placeholder: "Enter Email" },
        password: { label: "Password", type: "password", placeholder: "Enter Password" },
      },
      //form submit value gola ekane pabo
      async authorize(credentials, req) {
        const { password } = credentials;
        //connect with database
        //amra database users Collection ta access kortechi and ekane find kortesi email ase kina
        const user = await dbConnect("users").findOne({ email });

        if (!user) return null;
        //user jodi take & user password er input password ta match korle amra eta nivo

        //match password
        const isPasswordOk = await bcrypt.compare(password, user?.password);
        if (isPasswordOk) {
          return user;
        }
        //my own login logic
        return null;
      },
    }),

    //finished
  ],
};

const handler = NextAuth(authOptions);

// Initialization Next Auth use
export { handler as GET, handler as POST };
