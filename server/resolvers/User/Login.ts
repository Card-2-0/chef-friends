import dotenv from "dotenv";
import { Resolver, Mutation, Arg } from "type-graphql";
import { LoginInput } from "../../inputs/User/LoginInput";
import { prisma } from "../../prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
dotenv.config();
@Resolver()
export class Login {
  @Mutation(() => String)
  async login(@Arg("data") { email, password }: LoginInput) {
    const user = await prisma.user.findOne({ where: { email } });
    if (!user) return "";
    
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return "";
    let token = "";
    if(!!user) token = jwt.sign({ id: user.id }, 'secret');
    return token;
  }
}
