import { ObjectId } from "mongodb";
import { getDb } from "./users";

const COLLECTION_NAME = "products";

export type Product = {
  _id: string;
  name: string;
  slug: string;
  description: string;
  excerpt: string;
  price: number;
  tags: string[];
  thumbnail: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
};

export type outputProduct = {
  products: Product[];
  totalProducts: number;
  page: number;
  totalPages: number;
};

export const getProducts = async (search: string | null, page: number) => {
  const db = await getDb();

  // Count total products in the database
  const totalProductsQuery = search ? { name: { $regex: `${search}`, $options: "i" } } : {};
  const totalProducts = await db.collection<Product>(COLLECTION_NAME).countDocuments(totalProductsQuery);

  const pageSize = 5;
  // Calculate the total number of pages based on the total number of products and page size

  const totalPages = Math.ceil(totalProducts / pageSize);

  if (totalPages === 0) {
    return {
      products: [],
      totalProducts,
      page,
      totalPages,
    };
  }

  // Calculate the number of products to skip based on the current page
  const skip = (page - 1) * pageSize;

  // Query products from the database, applying search criteria and pagination
  const products = await db
    .collection<Product[]>("products")
    .find(search ? { name: { $regex: `${search}`, $options: "i" } } : {}) // Apply search criteria if provided
    .skip(skip) // Skip products based on pagination
    .limit(pageSize) // Limit the number of products per page
    .toArray(); // Convert the cursor to an array

  // Return the products along with pagination details
  return {
    products,
    totalProducts,
    page,
    totalPages,
  };
};

export const getProductBySlug = async (slug: string) => {
  const db = await getDb();
  const data = await db.collection<Product>(COLLECTION_NAME).findOne({ slug });
  // console.log(data);
  return data;
};
