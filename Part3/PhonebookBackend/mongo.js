const mongoose = require('mongoose')

if(!process.argv[2]){
    console.log("You need to enter a password as a parameter")
    process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://jerieltan05:${password}@cluster0.tryfm31.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    "name": String,
    "number": String,
})

const Person = mongoose.model("person", personSchema)

if(process.argv[3] && process.argv[4]){
    const person = new Person({
        "name": process.argv[3],
        "number": process.argv[4],
    })
    
    person.save().then(result => {
        console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
        mongoose.connection.close()
    })
} else {
    console.log("phonebook:")
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
}

