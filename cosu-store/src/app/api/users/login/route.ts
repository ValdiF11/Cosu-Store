import { userLogin, userSchema } from "@/app/validators/user.validator";
import { createUser, getUserByEmail, getUsers } from "@/db/models/users";
import { comparePassword } from "@/utils/bycript";
import { NextRequest } from "next/server";
import { z } from "zod";
import jwt from "jsonwebtoken";

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    console.log(body, "ini budi");

    const data = userLogin.parse(body);

    const user = await getUserByEmail(data.email);

    if (!user) {
      throw new Error("Invalid username or password");
    }

    const isPasswordValid = comparePassword(data.password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid username or password");
    }
    console.log("hit");

    const access_token = jwt.sign(
      {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
      process.env.JWT_SECRET as string
    );

    console.log(access_token);

    return Response.json({ access_token }, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return Response.json({ message: err.errors[0].message }, { status: 400 });
    }
    if ((err as Error).message === "Invalid username or password") {
      return Response.json({ message: "Invalid username or password" }, { status: 401 });
    }
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
};
