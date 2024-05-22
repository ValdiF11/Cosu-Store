// components/ProductCard.js
"use client";
import { Product } from "@/db/models/product";
import currency from "@/helper/currency";
import { ObjectId } from "mongodb";
import React from "react";
import AddWhistlist from "./addWhistlist";
import Link from "next/link";
import { wishlistOutput } from "@/db/models/wishlist";
import DeleteWishlist from "./deleteWhistlist";

interface ProductCardProps {
  product: wishlistOutput;
  fetching: () => Promise<void>;
}

const WhistlistCard: React.FC<ProductCardProps> = ({ product, fetching }) => {
  return (
    <div className="card card-side bg-base-100 shadow-xl w-full h-96">
      <figure>
        <img src={product.product.thumbnail} alt="Movie" className="w-96 aspect-square object-cover" /> {/* Removed fixed width */}
      </figure>
      <div className="flex flex-col p-5 justify-between">
        <h2 className="card-title">{product.product.name}</h2>
        <div className="badge badge-secondary">BEST DEAL!!!</div>
        <div>
          <div className="badge badge-outline mr-3">{product.product.tags[0]}</div>
          <div className="badge badge-outline">{product.product.tags[1]}</div>
        </div>
        <p className="">{product.product.excerpt}</p>
        <p className="text-justify text-white text-xl font-semibold">{currency(product.product.price)},00</p>
        <DeleteWishlist productId={product._id as string} fetching={fetching} />
      </div>
    </div>
  );
};

export default WhistlistCard;
