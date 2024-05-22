"use server";
import Banner from "@/components/banner";
import CardHome from "@/components/cardHome";
import About from "@/components/detailinformation";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { outputProduct } from "@/db/models/product";
import Link from "next/link";
import { FC } from "react";
import { IoMdHeartEmpty } from "react-icons/io";

async function getData(): Promise<outputProduct> {
  const res = await fetch(process.env.NEXT_PUBLIC_URL_API + "/products?search=furina", { cache: "no-store" });

  if (!res.ok) {
  }

  return res.json();
}

const Home = async () => {
  const data = await getData();
  return (
    <div className="bg-pink-50 flex flex-col items-center h-full shadow-xl">
      <Navbar />
      <div className="container w-5/6 flex flex-col items-center">
        <Banner />
        <div className="bg-white w-full rounded-md my-4 shadow-xl">
          <div className="flex flex-col items-center">
            <div className="flex items-center pt-8 pb-10">
              <img src="/leftline.png" alt="" className="w-75 h-10" />
              <h1 className="text-center text-pink-600 px-10 text-4xl font-extrabold"> Our Best Deal !!!! </h1>
              <img src="/rightline.png" alt="" className="w-75 h-10" />
            </div>
            {/* Card */}
            <div className="grid grid-cols-5 gap-5 px-5">
              {data.products.map((data, index) => {
                return <CardHome key={index} product={data} />;
              })}
            </div>

            {/* Card */}
            <div className="py-10">
              <div className="text-center pb-5">Still not interested?</div>
              <Link
                href={"/products"}
                className="bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-rose-600 hover:text-white focus:outline-none focus:bg-rose-900 focus:text-white"
                style={{ width: "150px" }}
              >
                See All Product
              </Link>
            </div>
          </div>
        </div>
        <About />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
