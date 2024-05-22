"use client";
import { handleLogout } from "@/actions/logout";

const Logout = () => {
  return (
    <button
      onClick={() => {
        handleLogout();
      }}
      className="bg-white text-xl text-pink-600 px-4 py-2 rounded-md mr-4 hover:bg-rose-600 hover:text-white focus:outline-none focus:bg-rose-900 focus:text-white"
    >
      Logout
    </button>
  );
};

export default Logout;
