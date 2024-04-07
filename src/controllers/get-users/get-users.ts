import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../../lib/prisma";
import { z } from "zod";

export async function getUsers(app:FastifyInstance){
    app
    .withTypeProvider<ZodTypeProvider>()
    .get('/users',{schema:{
      response:{
        200: z.object({
          users:z.array(z.object({
            id:z.string().uuid(),
            firstName:z.string(),
            lastName:z.string(),
            email:z.string().email(),
            password:z.string()
          }))
        })
      }
    }}, async (req,res) => {
      const users = await prisma.user.findMany()

      return res.status(200).send({users: users.map( (user) =>{
        return {id: user.id,
        firstName:user.firstName,
        lastName:user.lastName,
        email:user.email,
        password:user.password
        }
      })})
    }) 

  
}