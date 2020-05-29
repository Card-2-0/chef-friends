import { Resolver, Mutation, Arg } from "type-graphql";
import { prisma } from "../../prisma";
import fetch from "../../utils/fetchingData"

@Resolver()
export class UpdateChef {
    @Mutation(() => String)
    async updateChef ( @Arg("userid") userid : string ) {
        const rating = await fetch(userid);
        if(rating === null) return "User does not exist";
        const chef = await prisma.chef.findMany({where:{userid:userid}})
        await prisma.chef.update({
            where:{id:chef[0].id},
            data:{
                rating
            }
        })
        return "Done";
    }

}