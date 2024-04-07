import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../../lib/prisma";

export async function updateUser(app:FastifyInstance){
  app
  .withTypeProvider<ZodTypeProvider>()
  .patch('/users/:id', {
    schema:{
      params:z.object({
        id:z.string().uuid()
      }),
      body:z.object({
        firstName: z.string().nullish(),
        lastName: z.string().nullish(),
        email: z.string().email().nullish(),
        password: z.string().min(6).max(20).nullish()
      }),
      response:{
        200:z.object({
          user:z.object({
            id:z.string().uuid(),
            firstName:z.string(),
            lastName:z.string(),
            email:z.string().email(),
            password:z.string(),
            createdAt:z.date(),
            updatedAt:z.date()
          })
        })
      }
    }
  }, async (req,res) => {
    
    const { id } = req.params
    let { firstName, lastName, email, password} = req.body

    const user = await prisma.user.findUnique({
      where:{id}
    })

    if(!user){
      throw new Error('User not found!')
    }

    if(firstName === user.firstName){
      firstName = null
    }
    if(lastName === user.lastName){
      lastName === null
    }
    if(email === user.email){
      email = null
    }
    if(password === user.password){
      password = user.password
    }



    let updatedAt: Date | undefined;
    const hasChanges = !!(firstName || lastName || email || password); // Check for any truthy value
    if (hasChanges) {
      updatedAt = new Date();
    }

    

    const updatedUser = await prisma.user.update({
      data:{
        firstName:firstName??user.firstName,
        lastName:lastName??user.lastName,
        email:email??user.email,
        password:password??user.password,
        updatedAt:updatedAt??user.updatedAt
      },
      where:{
        id
      }
    })
    return res.status(200).send({user:updatedUser})
  })
}