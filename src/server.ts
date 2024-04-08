import fastify from 'fastify'
import { config } from 'dotenv'

import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastifyCors from "@fastify/cors";


import {  jsonSchemaTransform, serializerCompiler, validatorCompiler } from "fastify-type-provider-zod"

import { getUsers } from './controllers/get-users/get-users'
import { createUser } from './controllers/create-user/createuser'
import { updateUser } from './controllers/update-user/update-user'
import { deleteUser } from './controllers/delete-user/delete-user'
import { errorHandler } from './error-handler'

config()
const PORT = parseInt(process.env.PORT as string) || 3333
const app = fastify()

app.register(fastifySwagger, {
  swagger:{
    consumes:['application/json'],
    produces:['application/json'],
    info:{
      title:"user.api",
      description:"Especificacoes da API para o back-end da aplicacao que fere users",
      version:"1.0.0",
      contact:{
        email:"penaswild@gmail.com",
        name:"Penas Nipute"
      }
    }    
  },
  transform:jsonSchemaTransform
})

app.register(fastifyCors, {
  origin:'*'
})

app.register(fastifySwaggerUi, {
  routePrefix:"/docs"
})

// Add schema validator and serializer
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(getUsers)
app.register(createUser)
app.register(updateUser)
app.register(deleteUser)

app.setErrorHandler(errorHandler)


app.listen({port:PORT})
.then(() => {
  console.log(`Server running on port http://localhost:${PORT}`)
})
.catch((error) => {
  console.log({error:error.message})
})
