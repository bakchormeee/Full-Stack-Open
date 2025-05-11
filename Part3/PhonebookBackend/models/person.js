require("dotenv")
const mongoose = require("mongoose")
mongoose.set("strictQuery", false)

const url = process.env.MONGODB_URL
console.log("Connecting to...", url)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
    "name":{
      type: String,
      minLength: 3,
      required: true
    },
    "number":{
      type: String,
      minLength: 8,
      validate: {
        validator: (v) => {
          const vsplit = v.split("-")
          if(vsplit.length !== 2){
            return false
          } else {
            if(vsplit[0].length !== 2 && vsplit[0].length !== 3){
              return false
            }
            const regex = /^\d+$/
            if(regex.test(vsplit[0]) === false || regex.test(vsplit[1] === false)){
              return false
            }
          }
          return true
        }
      }
    }
})

personSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model("Person", personSchema)



