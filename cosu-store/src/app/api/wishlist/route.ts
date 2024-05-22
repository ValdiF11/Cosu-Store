import { wishlistInput } from "@/app/validators/user.validator";
import { addWhistlist, deleteWishlist, findAleradyWish, getWhistlist, getWishListbyId } from "@/db/models/wishlist";
import { ObjectId } from "mongodb";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { object, string, z } from "zod";

export const GET = async () => {
  const headersList = headers();
  const userId = headersList.get("userId") as string;
  console.log(userId);

  const data = await getWishListbyId(userId);
  console.log(data);

  return Response.json(data);
};

export const POST = async (request: NextRequest) => {
  const headersList = headers();
  const userId = headersList.get("userId");
  console.log(userId, "ini route");
  const body = await request.json();
  console.log(body);
  try {
    const data = wishlistInput.parse({ userId: userId, productId: body, createdAt: new Date().toString(), updatedAt: new Date().toString() });
    console.log(data, "ini data");
    const wishlist = await findAleradyWish(new ObjectId(data.userId), new ObjectId(data.productId));
    console.log(wishlist);
    if (wishlist) {
      throw new Error("Product already exist in wishlist");
    }
    const newWhistlist = await addWhistlist(data);
    return Response.json({ newWhistlist }, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return Response.json({ message: err.errors[0].message }, { status: 400 });
    }
    if ((err as Error).message === "Product already exist in wishlist") {
      return Response.json({ message: "Product already exist in wishlist" }, { status: 400 });
    }
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
};

export const DELETE = async (request: NextRequest) => {
  const body: { _id: string } = await request.json();
  console.log(body._id);
  if (!body._id) {
    return Response.json({ message: "Error delete data" }, { status: 400 });
  }
  await deleteWishlist(body._id);
  return NextResponse.json({ message: "succes delete data" }, { status: 200 });
};
