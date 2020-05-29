import { Resolver, Mutation, Arg } from "type-graphql";
import { prisma } from "../../prisma";
import { RemoveChefInput } from "../../inputs/Chef/RemoveChefInput"

@Resolver()
export class RemoveChef {
    @Mutation(() => String)
    async removeChef ( @Arg("data") { userid, userremove } : RemoveChefInput ) {
        const chef = await prisma.chef.findMany({where:{userid:userid}})
        await prisma.chef.update({
            where:{id:chef[0].id},
            data:{
                friendof:{disconnect:{id:userremove}},
            }
        })
        prisma.user.update({
            where:{id:userremove},
            data:{
                friends:{disconnect:{id:chef[0].id}}
            }
        })
        return "Done";
    }

}