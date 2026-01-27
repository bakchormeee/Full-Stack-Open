const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give content as argument')
  process.exit(1)
}



const url = 'mongodb+srv://jerieltan05:fullstackopen05@cluster0.tryfm31.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

if(process.argv[2] === 'List notes'){
  Note.find({}).then((result) => {
    result.forEach((note) => {
      console.log(note)
    })
    mongoose.connection.close()
  })
} else {
  const note = new Note({
    content: process.argv[2],
    important: true,
  })

  note.save().then((result) => {
    console.log('note saved!')
    console.log(result)
    mongoose.connection.close()
  })
}

