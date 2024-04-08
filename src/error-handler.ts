import { error } from "console"
import { FastifyInstance } from "fastify"
import { BadRequest } from "./controllers/_erros/bad-request"
import { ZodError } from "zod"


type FastifyErrorHandler = FastifyInstance['errorHandler']

export const errorHandler: FastifyErrorHandler = (error, req,res) => {
  
  if(error instanceof ZodError){
    res.status(400).send({
      message:'Error during validation',
      errors: error.flatten().fieldErrors
    })
  }
  
  if(error instanceof BadRequest){
    return res.status(400).send({
      error:error.message
    })
  }
  return res.status(500).send({message:'Internal server error'})
}