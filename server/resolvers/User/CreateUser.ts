import dotenv from "dotenv";
import { Resolver, Mutation, Arg } from "type-graphql";
import { CreateUserInput } from "../../inputs/User/CreateUserInput";
import { prisma } from "../../prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import axios from "axios";
import cheerio from "cheerio";
dotenv.config();

let siteUrl = "";
const fetchData = async () => {
  const result = await axios.get(siteUrl);
  return cheerio.load(result.data);
};

@Resolver()
export class CreateUser {
  @Mutation(() => String)
  async createUser(@Arg("data") { name, email, password, userid }: CreateUserInput) {
    const hashed = await bcrypt.hashSync(password, 12);
    siteUrl = ("https://www.codechef.com/users/"+userid)
    const $ = await fetchData();
    const currating = await $('.rating-number').text();
    if(currating.length == 0) return "User does not exist"; 
    console.log(parseInt((currating.substring(0,4))))
    const higrating = $('.rating-header').text();
    console.log(higrating.split('\n')[6].trim());
    const rating =  currating.substring(0,4)+' '+(higrating.split('\n')[6].trim());
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashed,
        userid
      },
    });
    const chef = await prisma.chef.create({
      data : {
        userid,
        rating
      }
    })
    let token = "";
    if (!!user) {
      token = jwt.sign({ id: user.id }, 'secret');
    }
    return token;
  }
}
