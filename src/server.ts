import express, { request, response } from 'express'
import {v4 as uuid} from 'uuid'

const app = express()

app.use(express.json())

//typescript
interface User {
  id: string,
  name: string,
  email: string
}

const users: User[] = []

// http://localhost:3333/users

// a requisição tipo GET é a única que conseguimos fazer pelo navegador

// tipos de parâmetros
// ----------------
//Query Params => 
// é mais utilizado quando a gente quer fazer filtro em informações, paginações e coisas do gênero durante uma requisição

//Routes Params
// especificar e  Identificar um recurso de em uma rota, geralmente é usado nas rotas de atualização e exclusão

//Request Body
//Quando precisamos enviar várias requisições para a API, mas sem ser através da URL, mais comum para quando a gente está criando uma nova entidade, e quando a gente está atualizado um recurso

app.get('/users', (request, response) => {
  // Buscar no banco de dados os usuários e retornar os usuários
  return response.json({users})
})

app.post('/users', (request, response) => {
  // Receber os dados do novo usuário
  const {name, email} = request.body

  // criar um novo usuário
  const user = {id: uuid(), name, email}

  // Registrar esse usuário na base de dados
  users.push(user)

  // Retornar os dados do usuário criado
  return response.json(user)
})

app.put('/users/:id', (request, response) =>{
  // receber os dados do usuário
  const { id } = request.params
  const {name, email} = request.body

  // localizar o usuário na base de dados
  const userIndex = users.findIndex((user) => user.id === id)
  // se o usuário não existir, retornar um erro
  if (userIndex < 0){
    return response.status(404).json({error: 'User not found'})
  }

  //atualizar o usuário na base de dados
  const user = {id, name, email}
  users[userIndex] = user

  // retornar os dados do usuário atualizados
  return response.json(user)
})

app.delete('/users:id', (request, response) => {
  // receber ID do usuário
  const {id} = request.params

  // localizar o usuário na base de dados
  const userIndex = users.findIndex((user) => user.id === id)
  // se o usuário não existir, retornar um erro
  if (userIndex < 0){
    return response.status(404).json({error: 'User not found'})
  }

  //exluir usuário da base de dados
  users.splice(userIndex, 1)
  
  //retornar status de sucesso
  return response.status(204).send()
})

app.listen('3333', () => {
  console.log('Back-end Started!')
})