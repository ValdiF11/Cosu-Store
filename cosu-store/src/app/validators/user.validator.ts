import { z } from "zod";

export const userSchema = z.object({
  name: z.nullable(z.string()),
  username: z.string({ message: "Username is required" }).min(1, { message: "Username is required" }),
  email: z.string({ message: "Email is required" }).email({ message: "Email must be email format" }).min(1, { message: "Email is required" }),
  password: z.string({ message: "Password is required" }).min(5, { message: "Password at least 5 character" }),
});

export const userLogin = z.object({
  email: z
    .string({ message: "Email or password is required" })
    .email({ message: "Email must be email format" })
    .min(1, { message: "Email or password is required" }),
  password: z.string({ message: "Email or password is required" }).min(5, { message: "Password at least 5 character" }),
});

export const wishlistInput = z.object({
  userId: z.string({ message: "UserId or password is required" }).min(1, { message: "UserId or password is required" }),
  productId: z.string({ message: "Email or password is required" }).min(1, { message: "Password at least 5 character" }),
  createdAt: z.nullable(z.string()),
  updatedAt: z.nullable(z.string()),
});
