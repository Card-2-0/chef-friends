import { Resolver, Mutation, Arg } from "type-graphql";
import { AddChefInput } from "../../inputs/Chef/AddChefInput"
import { prisma } from "../../prisma";
import axios from "axios";
import cheerio from "cheerio";

let siteUrl = "";
const fetchData = async () => {
  const result = await axios.get(siteUrl);
  return cheerio.load(result.data);
};

@Resolver()
export class AddChef {
  @Mutation(() => String)
  async addChef(@Arg("data") { useradding, userid }: AddChefInput) {

    const chef = await prisma.chef.findMany({where:{userid}})
    if((chef).length != 0) {
      const exchef = chef[0].id;
      await prisma.chef.update({
        where:{id:exchef},
        data : {
          friendof: {
            connect : {id : useradding}
          }
        }
      }
    )
    await prisma.user.update({
      where:{id:useradding},
      data:{
        friends : {
          connect : {id : exchef}
        }
      }
    })
    return "Done";
    }

    siteUrl = ("https://www.codechef.com/users/"+userid)
    const $ = await fetchData();
    const currating = await $('.rating-number').text();
    if(currating.length == 0) return "User does not exist"; 
    console.log(parseInt((currating.substring(0,4))))
    const higrating = $('.rating-header').text();
    console.log(higrating.split('\n')[6].trim());
    const rating =  currating.substring(0,4)+' '+(higrating.split('\n')[6].trim());
    const chefcr = await prisma.chef.create({
      data:{
        userid,
        rating,
        friendof : {connect: {id:useradding}}
      }
    })
    
    await prisma.user.update({
      where:{id:useradding},
      data:{
        friends:{connect:{id: chefcr.id}}
      }
    })

    return "Done";
  }
}
