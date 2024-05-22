"use client";
import ProductCard from "@/components/productCard";
import SearchBar from "@/components/searchBar";
import { Product, outputProduct } from "@/db/models/product";
import { useState, useEffect } from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import InfiniteScroll from "react-infinite-scroll-component";

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true); // New state to track initial load

  const fetchProducts = async (pageNum: number) => {
    setLoading(true);
    console.log(hasMore);

    if (hasMore) {
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_URL_API + `/products?search=${searchTerm}&pageNumber=${pageNum}`, {
          method: "GET",
          cache: "no-store",
        });
        const data = (await response.json()) as outputProduct;

        if (initialLoad) {
          setProducts(data.products);
          setInitialLoad(false);
        } else {
          setProducts((prevProducts) => [...prevProducts, ...data.products]);
        }
        setPage(pageNum + 1);
        setLoading(false);
        setHasMore(data.page <= data.totalPages);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching products:", error);
      }
    }
  };

  useEffect(() => {
    if (initialLoad || searchTerm || page > 1) {
      fetchProducts(page);
    }
  }, [initialLoad]);

  const handleSearch = () => {
    setPage(1);
    setProducts([]);
    setInitialLoad(true);
    setHasMore(true);
    fetchProducts(1);
  };

  const loadMoreProducts = () => {
    if (!loading) {
      fetchProducts(page);
    }
  };

  return (
    <div className="w-5/6 py-4">
      <div className="bg-white w-full rounded-md my-4 shadow-xl flex flex-col space-y-4 justify-center ">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSearch={handleSearch} />

        <InfiniteScroll
          className="p-1 flex flex-col items-center space-y-5"
          dataLength={products.length}
          next={() => fetchProducts(page + 1)}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={<p>No more products to load</p>}
        >
          {products.map((product, index) => (
            <div key={String(product._id)} className="w-4/6">
              <ProductCard product={product} />
            </div>
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default ProductList;
