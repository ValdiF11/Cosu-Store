"use client";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const AddWhistlistDetail = ({ productId }: { productId: string }) => {
  const router = useRouter();
  const addToWish = async (productId: string) => {
    const response = await fetch(process.env.NEXT_PUBLIC_URL_API + `/wishlist/`, {
      method: "POST",
      cache: "no-store",
      body: JSON.stringify(productId),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const { message } = await response.json();
      Swal.fire({
        title: "ERROR",
        text: `${message}`,
        icon: "error",
      });
    }
    Swal.fire({
      title: "Success!",
      text: `Success add to wishlist`,
      icon: "success",
    });
    router.push("/wishlist");
  };

  return (
    <button
      onClick={() => {
        addToWish(productId);
      }}
      className="bg-rose-600 text-xl text-white px-4 py-2 rounded-md mr-4 hover:bg-white hover:text-pink-600 focus:outline-none focus:bg-rose-900 focus:text-white w-full mt-4"
    >
      Add To Wishlist
    </button>
  );
};

export default AddWhistlistDetail;
