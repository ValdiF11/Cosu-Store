import { ObjectId } from "mongodb";
import { getDb } from "./users";
import { Product } from "./product";

const COLLECTION_NAME = "wishlists";

export type wishlist = {
  userId: string | ObjectId;
  productId: string | ObjectId;
  createdAt: string | null;
  updatedAt: string | null;
};

export type wishlistOutput = {
  _id: string | ObjectId;
  userId: string | ObjectId;
  productId: string | ObjectId;
  createdAt: string | null;
  updatedAt: string | null;
  product: Product;
};

export const getWhistlist = async (userId: string | null) => {
  const db = await getDb();
  if (!userId) {
    return Response.json({ message: "User not found" });
  }
  return await db.collection<wishlist>(COLLECTION_NAME).find({ userId }).toArray();
};

export const getWishListbyId = async (id: string | ObjectId) => {
  const db = await getDb();
  const objectId = typeof id === "string" ? new ObjectId(id) : id;
  return await db
    .collection<wishlist>(COLLECTION_NAME)
    .aggregate([
      {
        $match: {
          userId: new ObjectId(objectId),
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $unwind: {
          path: "$product",
          preserveNullAndEmptyArrays: false,
        },
      },
    ])
    .toArray();
};

export const findAleradyWish = async (userId: string | ObjectId, productId: string | ObjectId) => {
  const db = await getDb();
  return await db.collection<wishlist>(COLLECTION_NAME).findOne({ $and: [{ userId }, { productId }] });
};

export const addWhistlist = async (newWhistlist: wishlist) => {
  const db = await getDb();
  newWhistlist.userId = new ObjectId(newWhistlist.userId);
  newWhistlist.productId = new ObjectId(newWhistlist.productId);
  newWhistlist.createdAt = newWhistlist.updatedAt = new Date().toISOString();
  const { insertedId } = await db.collection<wishlist>(COLLECTION_NAME).insertOne(newWhistlist);
  return await getWishListbyId(insertedId);
};

export const deleteWishlist = async (id: string | ObjectId) => {
  const db = await getDb();
  const objectId = typeof id === "string" ? new ObjectId(id) : id;
  await db.collection<wishlist>(COLLECTION_NAME).deleteOne({ _id: objectId });
};
