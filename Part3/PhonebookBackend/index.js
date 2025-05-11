require("dotenv").config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const Person = require("./models/person")
const note = require("../NotesBackend/models/note")
const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}
app.use(express.json()) //mount this middlewear such that it applies to all routes
app.use(express.static('dist'))

morgan.token('content', (req) => {
  return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))
app.use(errorHandler)

app.get("/api/persons", (request, response) => {
  Person
    .find({}).then(people => {
      JSON.stringify(people)
      response.json(people)
    })
    .catch(error => {
      next(error)
    })
  console.log("Phonebook sent")
})

app.get("/info", (request, response) => {
  const now = new Date()
  Person.find({})
    .then(people => {
      response.send(`
        <div>
          <div>Phonebook has info for ${people.length} people\n</div>
          <div>${now}</div>
        </div>`)
    })
    .catch(error => {
      next(error)
    })
})

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id
  Person.findById(id)
    .then(person => {
      JSON.stringify(person)
      response.json(person)
    })
    .catch(error => {
      next(error)
    })
})

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id
  Person.findByIdAndDelete(id)
    .then(result => {
      console.log(`${result.name} deleted successfully`)
      response.json(result).status(204).end()
    })
    .catch(error => {
      next(error)
    })
})


app.post("/api/persons", (request, response, next) => {
  const data = request.body
  Person.find({})
    .then(people => {
      if(!data.name || !data.number){
        response.statusMessage = "Name or Number is missing"
        response.status(404).end()
      } else {
        const person = new Person({
          "name":data.name,
          "number":data.number,
        })
        person.save().then(savedPerson => {
          response.json(savedPerson).end()
        }).catch(error => {next(error)})
      }
    })
    .catch(error => {
      next(error)
    })
})

app.put("/api/persons/:id", (request, response, next) => {
  const data = request.body
  console.log(JSON.stringify(data))
  Person.findById(request.params.id)
    .then(person => {
      if(!person){
        console.log("Person is invalid")
        return response.status(404)
      }

      person.number = data.number

      return person.save().then(updatedPerson => {
        response.json(updatedPerson)
      }).then(error => {
        console.log("Did not manage to save person")
        next(error)
      })
    })
    .catch(error => {
      console.log("Did not manage to find person by ID")
      next(error)
    })
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})