import { getProductParams } from "@/app/api/products/[slug]/route";
import AddWhistlistDetail from "@/components/addWhistlistDetail";
import { Product } from "@/db/models/product";
import currency from "@/helper/currency";

import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const res = await fetch(process.env.NEXT_PUBLIC_URL_API + `/products/${params.slug}`, {
    method: "GET",
    cache: "no-store",
  });
  const product = (await res.json()) as Product;
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: product.name,
    openGraph: {
      images: ["/some-specific-page-image.jpg", ...previousImages],
    },
  };
}

const DetailProduct = async ({ params }: getProductParams) => {
  const { slug } = params;
  const res = await fetch(process.env.NEXT_PUBLIC_URL_API + `/products/${params.slug}`, {
    method: "GET",
    cache: "no-store",
  });

  const data = (await res.json()) as Product;

  return (
    <div className="w-5/6 py-4">
      <div className="bg-white w-full rounded-md my-4 shadow-xl">
        <div className="p-28">
          <div className="bg-pink-50 flex justify-center rounded-2xl">
            <div className="w-96 rounded-md py-20">
              <h1 className="text-4xl font-extrabold text-rose-950 pb-14">Detail Product</h1>
              <div className="carousel w-96 h-96">
                <div id="item1" className="carousel-item w-full">
                  <img src={data.images[0]} className="w-full rounded-xl object-cover clo" />
                </div>
                <div id="item2" className="carousel-item w-full">
                  <img src={data.images[1]} className="w-full rounded-xl object-cover" />
                </div>
                <div id="item3" className="carousel-item w-full">
                  <img src={data.images[2]} className="w-full rounded-xl object-cover" />
                </div>
                <div id="item4" className="carousel-item w-full">
                  <img src={data.images[3]} className="w-full rounded-xl object-cover" />
                </div>
              </div>
              <div className="flex justify-center w-full py-2 gap-2">
                <a href="#item1">
                  <img src={data.images[0]} className="w-28 h-28 rounded-xl object-cover " />
                </a>
                <a href="#item2">
                  <img src={data.images[2]} className="w-28 h-28 rounded-xl object-cover" />
                </a>
                <a href="#item3">
                  <img src={data.images[3]} className="w-28 h-28 rounded-xl object-cover" />
                </a>
                <a href="#item4">
                  <img src={data.images[1]} alt="furina-4" className="w-28 h-28 rounded-xl object-cover" />
                </a>
              </div>
              <AddWhistlistDetail productId={data._id} />
            </div>
            <div className=" w-7/12 pl-14 pt-44 pb-24 space-y-14" style={{ wordWrap: "break-word" }}>
              <h1 className="text-2xl text-neutral-950">{data.name}</h1>
              <h1 className="text-4xl font-extrabold text-neutral-950">{currency(data.price)},00</h1>
              <pre className="text-justify text-black">{data.description}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;
