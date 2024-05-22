import { getUserById } from "@/db/models/users";

export type GetUserDetailParam = {
  params: {
    id: string;
  };
};

export const GET = async (_request: Request, { params }: GetUserDetailParam) => {
  const user = getUserById(params.id);
  return Response.json(user);
};
