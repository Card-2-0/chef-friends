import { Resolver, Mutation, Arg } from "type-graphql";
import { AddChefInput } from "../../inputs/Chef/AddChefInput"
import { prisma } from "../../prisma";
import fetch from "../../utils/fetchingData"

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
    })
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
    
    const rating = await fetch(userid);
    if(rating === null) return "User does not exist";
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
