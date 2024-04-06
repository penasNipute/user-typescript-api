import { error } from 'console'
import fastify from 'fastify'
import { config } from 'dotenv'
import { parse } from 'path'

config()
const PORT = parseInt(process.env.PORT as string)
const app = fastify()

app.get('/',(req,res) => {
  return res.send({message:"Ola amigo... Ola amigo!"})
})


app.listen({port:PORT})
.then(() => {
  console.log(`Server running on port http://localhost:${PORT}`)
})
.catch((error) => {
  console.log({error:error.message})
})