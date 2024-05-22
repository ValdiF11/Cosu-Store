import React from "react";

const Banner = () => {
  return (
    <div className="carousel w-full ">
      <div id="slide1" className="carousel-item relative w-full">
        <div className="flex flex-col items-center">
          <img
            src="https://res.cloudinary.com/dnvty1n0c/image/upload/v1715160659/cosu%20store/Blue_And_Pink_Playful_Discount_Banner_nfaeuh.png"
            className="object-fill rounded-md"
          />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a
              href="#slide4"
              className="flex justify-center items-center btn-circle bg-white text-rose-900 outline-none hover:bg-opacity-0 hover:outline-rose-900"
            >
              ❮
            </a>
            <a
              href="#slide2"
              className="flex justify-center items-center btn-circle bg-white text-rose-900 outline-none hover:bg-opacity-0 hover:outline-rose-900"
            >
              ❯
            </a>
          </div>
        </div>
      </div>
      <div id="slide2" className="carousel-item relative w-full">
        <div className="flex flex-col items-center">
          <img
            src="https://res.cloudinary.com/dnvty1n0c/image/upload/v1715160651/cosu%20store/Olive_Elegant_Skincare_Summer_Sale_Discount_Banner_py13tn.png"
            className="object-fill rounded-md"
          />
        </div>
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a
            href="#slide1"
            className="flex justify-center items-center btn-circle bg-white text-rose-900 outline-none hover:bg-opacity-0 hover:outline-rose-900"
          >
            ❮
          </a>
          <a
            href="#slide3"
            className="flex justify-center items-center btn-circle bg-white text-rose-900 outline-none hover:bg-opacity-0 hover:outline-rose-900"
          >
            ❯
          </a>
        </div>
      </div>
      <div id="slide3" className="carousel-item relative w-full">
        <div className="flex flex-col items-center">
          <img
            src="https://res.cloudinary.com/dnvty1n0c/image/upload/v1715169983/cosu%20store/White_Black_Simple_New_Product_Sale_Banner_Landscape_sjqvol.png"
            className="object-fill rounded-md"
          />
        </div>

        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a
            href="#slide2"
            className="flex justify-center items-center btn-circle bg-white text-rose-900 outline-none hover:bg-opacity-0 hover:outline-rose-900"
          >
            ❮
          </a>
          <a
            href="#slide4"
            className="flex justify-center items-center btn-circle bg-white text-rose-900 outline-none hover:bg-opacity-0 hover:outline-rose-900"
          >
            ❯
          </a>
        </div>
      </div>
      <div id="slide4" className="carousel-item relative w-full">
        <div className="flex flex-col items-center">
          <img
            src="https://res.cloudinary.com/dnvty1n0c/image/upload/v1715172631/cosu%20store/Seafoam_Blue_And_Black_Minimalist_New_Product_Skincare_Routine_Banner_1_m9y9r1.png"
            className="object-fill rounded-md"
          />
        </div>
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a
            href="#slide3"
            className="flex justify-center items-center btn-circle bg-white text-rose-900 outline-none hover:bg-opacity-0 hover:outline-rose-900"
          >
            ❮
          </a>
          <a
            href="#slide1"
            className="flex justify-center items-center btn-circle bg-white text-rose-900 outline-none hover:bg-opacity-0 hover:outline-rose-900"
          >
            ❯
          </a>
        </div>
      </div>
    </div>
  );
};

export default Banner;
