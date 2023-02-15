import { CreateExpressContextOptions } from "@trpc/server/adapters/express";

import prisma from "./prismaClient";
import { TRPCError } from "@trpc/server";

export const createContext = ({ req, res }: CreateExpressContextOptions) => {
  /**
   * Here is where you can write authentication and authorization logic.
   * const token = req.headers.authorization.startsWith("Bearer") && req.headers.authorization.split(" ")[1]
   *
   */
  const user = {
    id: 1,
    name: "John Doe",
    token: null,
  };

  if (!user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You are not authenticated",
    });
  }
  return {
    req,
    res,
    user,
    prisma,
  };
};
