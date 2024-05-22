// Navbar.tsx
"use server";
import React from "react";
import Link from "next/link";
import { IoMdHeartEmpty } from "react-icons/io";
import Logout from "./logoutbutton";
import { cookies } from "next/headers";

const Navbar = async () => {
  let isLoggedIn = false;
  const login = await cookies().get("Authorization");
  if (login) {
    isLoggedIn = true;
  } else {
    isLoggedIn = false;
  }

  return (
    <nav className="flex items-center justify-between bg-pink-200 text-white p-4 w-full">
      {/* Logo Store */}
      <div className="flex items-center">
        <Link href="/">
          <img src="/logo.png" alt="Logo Store" className="h-12 mr-6" />
        </Link>
        <Link href="/products" className="mr-4 text-rose-600 font-extrabold text-xl ">
          Product
        </Link>
      </div>

      {/* Auth Buttons */}
      {isLoggedIn ? (
        // User is logged in
        <div className="flex items-center">
          <Link href="/wishlist" className="mr-4 flex items-center">
            <div className="flex items-center">
              <IoMdHeartEmpty color="red" size={25} /> <span className="ml-1 text-rose-600 text-xl">Whistlist</span>
            </div>
          </Link>
          <div className="flex items-center">
            <Logout />
          </div>
        </div>
      ) : (
        // User is not logged in
        <div className="flex items-center">
          <Link href="/login" className="mx-2">
            <button
              className="bg-white text-lg text-pink-600 px-4 py-2 rounded-md mr-4 hover:bg-rose-600 hover:text-white focus:outline-none focus:bg-rose-900 focus:text-white"
              style={{ width: "100px" }}
            >
              Login
            </button>
          </Link>
          <Link href="/register" className="mr-2">
            <button
              className="bg-white text-lg text-pink-600 px-4 py-2 rounded-md hover:bg-rose-600 hover:text-white focus:outline-none focus:bg-rose-900 focus:text-white"
              style={{ width: "100px" }}
            >
              Register
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
