import { getProductBySlug } from "@/db/models/product";
import { getUserById } from "@/db/models/users";
import { NextRequest, NextResponse } from "next/server";

export type getProductParams = {
  params: {
    slug: string;
  };
};

export const GET = async (_request: NextRequest, { params }: getProductParams) => {
  const data = await getProductBySlug(params.slug);
  return NextResponse.json(data);
};
