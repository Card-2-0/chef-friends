import dotenv from "dotenv";
import { Resolver, Mutation, Arg } from "type-graphql";
import { LoginInput } from "../../inputs/User/LoginInput";
import { prisma } from "../../prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
dotenv.config();
@Resolver()
export class Login {
  @Mutation(() => String, { nullable: true })
  async login(@Arg("data") { email, password }: LoginInput) {
    const user = await prisma.user.findOne({ where: { email } });
    if (!user) return null;

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return null;
    return jwt.sign({ id: user.id }, process.env.JWT_SECRET!);
  }
}
