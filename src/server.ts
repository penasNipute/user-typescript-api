import fastify from 'fastify'
import { config } from 'dotenv'


import {  serializerCompiler, validatorCompiler } from "fastify-type-provider-zod"
import { getUsersControler } from './controllers/get-users/get-users'
import { createUser } from './controllers/create-user/createuser'
import { updateUser } from './controllers/update-user/update-user'

config()
const PORT = parseInt(process.env.PORT as string)
const app = fastify()

app.get('/',(req,res) => {
  return res.send({message:"Ola amigo... Ola amigo!"})
})



// Add schema validator and serializer
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(getUsersControler)
app.register(createUser)
app.register(updateUser)

app.listen({port:PORT})
.then(() => {
  console.log(`Server running on port http://localhost:${PORT}`)
})
.catch((error) => {
  console.log({error:error.message})
})



