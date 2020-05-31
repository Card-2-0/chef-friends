import dotenv from "dotenv";
import { Resolver, Mutation, Arg } from "type-graphql";
import { CreateUserInput } from "../../inputs/User/CreateUserInput";
import { prisma } from "../../prisma";
import fetch from "../../utils/fetchingData";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
dotenv.config();

@Resolver()
export class CreateUser {
  @Mutation(() => String)
  async createUser(
    @Arg("data") { name, email, password, userid }: CreateUserInput
  ) {
    const hashed = await bcrypt.hashSync(password, 12);
    const rating = await fetch(userid);
    if (rating === null) return "1";
    try{
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashed,
        userid,
      },
    });
    const exchef = await prisma.chef.findMany({ where: { userid } });
    if (exchef.length === 0) {
      await prisma.chef.create({
        data: {
          userid,
          rating,
        },
      });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!);
    return token;
  } catch{
    return "2"
  }
}
}