const express = require('express')
const morgan = require('morgan')
const app = express()
app.use(express.json()) //mount this middlewear such that it applies to all routes
app.use(express.static('dist'))

morgan.token('content', (req) => {
  return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))

let phonebook = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get("/api/persons", (request, response) => {
  console.log("Phonebook sent")
  response.json(phonebook).end()
})

app.get("/info", (request, response) => {
  const now = new Date()
  response.send(`
    <div>
      <div>Phonebook has info for ${phonebook.length} people\n</div>
      <div>${now}</div>
    </div>`)
})

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id
  data = phonebook.find((element) => element["id"] === id)
  if(data){
    response.send(data)
  } else {
    response.statusMessage = "Selected id out of bounds"
    response.status(404).end()
  }
})

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id
  phonebook = phonebook.filter(note => note.id !== id)
  response.status(204).end()
})

app.post("/api/persons", (request, response) => {
  data = request.body
  const person = {
    "id": data.id,
    "name":data.name,
    "number":data.number
  }
  if(phonebook.find(i => i.name === person.name)){
    response.statusMessage = "Name already exists in the phonebook"
    response.status(404).end()
  } else if(!data.name || !data.number || !data.id){
    response.statusMessage = "Name, Number or ID is missing"
    response.status(404).end()
  } else {
    phonebook.push(person)
    response.end()
  }
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})