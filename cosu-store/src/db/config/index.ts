import { MongoClient, ServerApiVersion } from "mongodb";
const uri = process.env.MONGO_DB_CONNECTION_STRING;

let client: MongoClient;

export async function getMongoDbInstance() {
  if (!uri) {
    throw new Error("Please Check Again Mongo DB Connection String");
  }

  if (!client) {
    client = await MongoClient.connect(uri);

    await client.connect;
  }

  return client;
}
