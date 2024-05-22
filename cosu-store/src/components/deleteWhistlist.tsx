"use client";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const DeleteWishlist = ({ productId, fetching }: { productId: string; fetching: () => Promise<void> }) => {
  const router = useRouter();
  const delelet = async (productId: string) => {
    const response = await fetch(process.env.NEXT_PUBLIC_URL_API + `/wishlist`, {
      method: "DELETE",
      cache: "no-store",
      body: JSON.stringify({ _id: productId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);

    Swal.fire({
      title: "Success!",
      text: `Success delete wishlist`,
      icon: "success",
    });
    fetching();
    router.push("/wishlist");
  };

  return (
    <button
      onClick={() => {
        delelet(productId);
      }}
      className="bg-rose-600 text-xl text-white px-4 py-2 rounded-md mr-4 hover:bg-white hover:text-pink-600 focus:outline-none focus:bg-rose-900 focus:text-white w-full mt-4"
    >
      Delete from wishlist
    </button>
  );
};

export default DeleteWishlist;
