import { getProducts } from "@/db/models/product";
import { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  const url = new URL(request.url);
  const searchQuery = url.searchParams.get("search");
  const pages = url.searchParams.get("pageNumber") || "1";
  const products = await getProducts(searchQuery, Number(pages));
  return Response.json(products);
};
