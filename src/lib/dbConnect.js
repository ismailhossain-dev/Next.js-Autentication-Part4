const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAMe;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

//My custom code

//db name ta export kore divo karon sob jaigay use korthe pari motho
//dbName e jey collection gola divo segola cname ekane save korbo
export const dbConnect = (cname) => {
  return client.db(dbName).collection(cname);
};
