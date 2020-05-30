import { User } from "@prisma/client";
import { Request } from "express";
import jwt from "jsonwebtoken";
import { ExecutionParams } from "subscriptions-transport-ws";
import { prisma } from "../prisma";
import dotenv from "dotenv";
dotenv.config();
interface AuthParams {
  req: Request;
  connection?: ExecutionParams;
}

export const getAuthUser = async ({ req, connection }: AuthParams) => {
  const header: string = !!req
    ? req.headers.authorization
    : connection!.context.Authorization;
  let user: User | null = null;
  if (!!header) {
    const token: string = header.split(" ")[1];
    if (!!token) {
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
      user = await prisma.user.findOne({ where: { id: decoded.id } });
    }
  }
  console.log(user);
  return user;
};
