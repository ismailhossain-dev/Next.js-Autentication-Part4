//v:4 connect database with next.js
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.MONGODB_URL;
const dbName = process.env.DB_NAME;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

//user collection name jeta dive seta hobe
export const dbConnect = (cname) => {
  return client.db(dbName).collection(cname);
};
