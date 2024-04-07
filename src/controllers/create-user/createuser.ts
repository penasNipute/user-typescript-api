import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../../lib/prisma";

export async function createUser(app:FastifyInstance){
  app
  .withTypeProvider<ZodTypeProvider>()
  .post('/users',{schema:{
    body: z.object({
      firstName: z.string().min(3),
      lastName: z.string().min(3),
      email: z.string().email(),
      password: z.string().min(6).max(20)
    }),
    response:{
      201: z.object({
          userId:z.string().uuid()
        })
    }
  }}, async (req,res) => {
    const { firstName, lastName, email, password } = req.body

    const userWithSameEmail = await prisma.user.findMany({
      where:{email}
    })

    if(userWithSameEmail){
      throw new Error('User already exists')
    }

    const user = await prisma.user.create({
      data:{
        firstName,
        lastName,
        email,
        password
      }
    })

    return res.status(201).send({userId: user.id})
  })
}
