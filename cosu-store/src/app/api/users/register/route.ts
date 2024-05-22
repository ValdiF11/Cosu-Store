import { userSchema } from "@/app/validators/user.validator";
import { createUser, getUserByEmail, getUserByUsername, getUsers } from "@/db/models/users";
import { z } from "zod";

export const POST = async (request: Request) => {
  console.log(request);
  const body = await request.json();
  console.log(body, "ini data pstman");
  try {
    const data = userSchema.parse(body);
    console.log(data, "ini data");
    const user = await getUserByEmail(data.email);
    if (user) {
      throw new Error("Email already exist");
    }
    const user2 = await getUserByUsername(data.username);
    if (user2) {
      throw new Error("Username already exist");
    }
    console.log(user, "ini filter email");
    const createdUser = await createUser(data);
    return Response.json({ createdUser }, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return Response.json({ message: err.errors[0].message }, { status: 400 });
    }
    if ((err as Error).message === "Email already exist") {
      return Response.json({ message: "Email already exist" }, { status: 400 });
    }
    if ((err as Error).message === "Username already exist") {
      return Response.json({ message: "Username already exist" }, { status: 400 });
    }
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
};
