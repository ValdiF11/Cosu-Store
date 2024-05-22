import { Product } from "@/db/models/product";
import currency from "@/helper/currency";
import Link from "next/link";

const CardHome = ({ product }: { product: Product }) => {
  return (
    <Link href={`/products/${product.slug}`}>
      <div className="card w-auto h-full bg-grey-100 duration-500 hover:scale-105 shadow-xl">
        <figure>
          <img src={product.thumbnail} alt="Shoes" className="aspect-square" />
        </figure>
        <div className="flex flex-col p-5 space-y-3">
          <h2 className="card-title text-black">{product.name}</h2>
          <div className="badge badge-secondary">BEST DEAL!!!</div>
          <p className="text-slate-900">{product.excerpt}</p>
          <p className="text-justify text-blue-950 font-semibold">{currency(product.price)}</p>
        </div>
      </div>
    </Link>
  );
};

export default CardHome;
