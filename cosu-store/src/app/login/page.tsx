// LoginPage.tsx
import Notif from "@/components/errorNotification";
import { url } from "inspector";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const loginAction = async (formData: FormData) => {
  "use server";
  const email = formData.get("email");
  const password = formData.get("password");
  const body = {
    email,
    password,
  };
  console.log(process.env.NEXT_PUBLIC_URL_API, "ini url");

  const response = await fetch(process.env.NEXT_PUBLIC_URL_API + "/users/login", {
    method: "POST",
    cache: "no-store",
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    redirect(`/login?error=${errorResponse.message}`);
  }

  const data = await response.json();

  cookies().set(`Authorization`, `Bearer ${data.access_token}`);
  console.log(data);
  redirect("/");
};

const LoginPage = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <img src="/BackgroundLogin.png" alt="Background" className="absolute top-0 right-100 w-52 object-cover z-0 " />

      <div className="relative z-10 w-100 p-8 bg-white rounded-lg shadow-md">
        <div className="mb-2 text-center">
          <img src="/logo.png" alt="Logo" className="w-52 mx-auto mb-1" />
          <h1 className="text-2xl font-semibold">Welcome Back Goshujin Sama!!!</h1>
        </div>
        <form action={loginAction}>
          <Notif />
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
          <button type="submit" className="w-full py-2 px-4 bg-pink-400 text-white rounded-md hover:bg-pink-600 focus:outline-none focus:bg-pink-900">
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          Didn&apos;t have account?
          <span className="mx-2 text-gray-400">|</span>
          <Link href="/register" className="text-blue-500 hover:underline">
            Create new account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
