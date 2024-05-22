"use client";

import WhistlistCard from "@/components/WishlistCard";
import { wishlistOutput } from "@/db/models/wishlist";
import { useEffect, useState } from "react";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState<wishlistOutput[]>([]);
  const fetchProducts = async () => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_URL_API + `/wishlist`, {
        method: "GET",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = (await response.json()) as wishlistOutput[];
      console.log(data);
      setWishlist(data);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="w-5/6 py-4 my-5 min-h-dvh bg-white shadow-xl">
      <div className="px-28 pt-28 pb-10 text-4xl font-semibold text-rose-950"> My Wishlist</div>
      <div className="px-28 pb-28 flex flex-col space-y-10">
        {wishlist.map((product, index) => (
          <div key={String(product._id)} className="w-4/6">
            <WhistlistCard product={product} fetching={fetchProducts} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
