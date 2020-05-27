import dotenv from "dotenv";
import { Resolver, Mutation, Arg } from "type-graphql";
import { CreateUserInput } from "../../inputs/User/CreateUserInput";
import { prisma } from "../../prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dotenv.config();
@Resolver()
export class CreateUser {
  @Mutation(() => String)
  async createUser(@Arg("data") { name, email, password, rating }: CreateUserInput) {
    const hashed = await bcrypt.hashSync(password, 12);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashed,
        rating
      },
    });
    let token = "";
    if (!!user) {
      token = jwt.sign({ id: user.id }, 'secret');
    }
    return token;
  }
}
