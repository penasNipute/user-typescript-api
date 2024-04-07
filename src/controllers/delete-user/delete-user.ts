import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { ZodTypeDef, z } from "zod";
import { prisma } from "../../lib/prisma";


export async function deleteUser(app:FastifyInstance){
  app
  .withTypeProvider<ZodTypeProvider>()
  .delete('/users/:id',{
    schema:{
      params:z.object({
        id: z.string()
      }),
      response:{
        200:z.object({
          message:z.string()
        })
      }
    }
  }, async (req,res) => {
    
      const { id } = req.params

      const userExists = await prisma.user.findUnique({
        where:{ id }
      })

      if(!userExists){
        throw new Error('User not found!')
      }

      await prisma.user.delete({
        where:{ id }
      })
      
      return res.status(200).send({message:'User successfully deleted'})
    
    
  })
}