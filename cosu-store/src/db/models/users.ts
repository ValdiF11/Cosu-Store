import { hashPassword } from "@/utils/bycript";
import { getMongoDbInstance } from "../config";
import { Collection, Db, ObjectId } from "mongodb";

const DB_NAME = process.env.MONGO_DB_NAME;
const COLLECTION_NAME = "users";

export type User = {
  name: string | null;
  username: string;
  email: string;
  password: string;
};

export const getDb = async () => {
  const client = await getMongoDbInstance();
  const db = client.db(DB_NAME);
  return db;
};

export const getUsers = async () => {
  const db = await getDb();
  return await db.collection<User>(COLLECTION_NAME).find().project({ password: 0 }).toArray();
};

export const getUserById = async (id: string | ObjectId) => {
  const db = await getDb();
  const objectId = typeof id === "string" ? new ObjectId(id) : id;
  return await db.collection<User>(COLLECTION_NAME).findOne({ _id: objectId }, { projection: { password: 0 } });
};

export const getUserByEmail = async (email: string) => {
  const db = await getDb();
  return await db.collection<User>(COLLECTION_NAME).findOne({ email });
};

export const getUserByUsername = async (username: string) => {
  const db = await getDb();
  return await db.collection<User>(COLLECTION_NAME).findOne({ username }, { projection: { password: 0 } });
};

export const createUser = async (newUser: User) => {
  const db = await getDb();
  newUser.password = hashPassword(newUser.password);
  const { insertedId } = await db.collection<User>(COLLECTION_NAME).insertOne(newUser);
  return await getUserById(insertedId);
};
