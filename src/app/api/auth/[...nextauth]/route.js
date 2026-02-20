//V:1, 2 Next auth all work
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
//user list
const userList = [
  {
    name: "hablu",
    password: "1234",
  },
  {
    name: "dablu",
    password: "5678",
  },
  {
    name: "bablue",
    password: "8901",
  },
];
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // Sign in with {name} button
      name: "Email & Password",
      //form input
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
        //create me
        secretCode: { label: "Secret code", type: "password", placeholder: "enter code" },
      },
      //form submit value gola ekane pabo
      async authorize(credentials, req) {
        const { username, password, secretCode } = credentials;
        //login logic implement
        const user = userList.find((u) => u.name === username);
        if (!user) return null;
        //user jodi take & user password er input password ta match korle amra eta nivo
        const isPassword = user.password === password;
        if (isPassword) {
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
