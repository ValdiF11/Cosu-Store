// RegisterPage.tsx
import Notif from "@/components/errorNotification";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const registerAction = async (formData: FormData) => {
  "use server";
  const name = formData.get("name");
  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");
  const body = {
    name,
    username,
    email,
    password,
  };

  const response = await fetch(process.env.NEXT_PUBLIC_URL_API + "/users/register", {
    method: "POST",
    cache: "no-store",
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    redirect(`/register?error=${errorResponse.message}`);
  }

  redirect("/login");
};

const RegisterPage = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      {/* Background Image */}
      <img src="/LoginBackground.png" alt="Background" className="absolute top-1 right-2/5 w-80 object-cover z-0" />

      {/* Register Container */}
      <div className="relative z-10 w-3/12 p-4 mt-28 bg-white rounded-lg shadow-md">
        {/* Logo */}
        <div className="mb-1 text-center">
          <img src="/logo.png" alt="Logo" className="w-52 mx-auto" />
          <h1 className="text-2xl font-semibold">Lets Join Us Minna Sann!!</h1>
        </div>
        <form action={registerAction}>
          <div className="mb-4">
            <Notif />
            <label htmlFor="name" className="block mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="username" className="block mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <button type="submit" className="w-full py-2 px-4 bg-rose-400 text-white rounded-md hover:bg-rose-600 focus:outline-none focus:bg-rose-900">
            Register
          </button>
        </form>
        <div className="mt-4 text-center">
          Already have an account?
          <Link href="/login" className="mx-2 text-blue-500 hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
