import {useEffect, useState} from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import axios from 'axios'
import noteService from './services/notes'

const serverurl = "http://localhost:3001/persons"

const filterPeople = ({condition, persons}) => {
  return (
    persons.filter(person => person.name.toLowerCase().includes(condition.toLowerCase()))
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [condition, setCondition] = useState('') //set initial value

  useEffect(() => {
    noteService.getAll()
      .then((props) => {setPersons(props.data)})
  }, []) 

  const handleNameChange = (event) => {
    const newText = event.target.value
    setNewName(newText)
    console.log(newText)
  }

  const handleNumChange = (event) => {
    setNewNumber(event.target.value)
    console.log(event.target.value)
  }

  const handleConditionChange = (event) => {
    setCondition(event.target.value)
    console.log(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const editname = newName.toLowerCase().replace(" ", "")
    const editnumber = newNumber.toLowerCase().replace(" ","")
    const strid = editname.concat(editnumber)
    const nameObject = {
      name: newName,
      number: newNumber,
      id: strid
    }
    if((persons.find(person => person.name === newName)) === undefined){
      noteService.addNew({newObject:nameObject})
        .then(() => {
          setPersons(persons.concat(nameObject))
        })
    } else {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const olditem = persons.find(person => person.name === newName)
        noteService.update({id:olditem.id, newObject:nameObject})
        const index = persons.indexOf(olditem)
        setPersons(persons.toSpliced(index, 1, nameObject))
      }
    }
    setNewName('')
    setNewNumber('')
  }

  const peopleToShow = filterPeople({condition:condition, persons:persons})

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter condition={condition} handleConditionChange={handleConditionChange}/>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumChange={handleNumChange} />
      <h2>Numbers</h2>
      <Persons persons={peopleToShow} setPersons={setPersons} />
    </div>
  )
}

export default App