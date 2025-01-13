import { useState } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'

const filterPeople = ({condition, persons}) => {
  return (
    persons.filter(person => person.name.toLowerCase().includes(condition.toLowerCase()))
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: "040-1234567"
    }]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [condition, setCondition] = useState('') //set initial value

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
    if((persons.find(person => person.name === newName)) === undefined){
      const nameObject = {
        name: newName,
        number: newNumber
      }
      console.log(persons.find(person => person.name === newName))
      setPersons(persons.concat(nameObject))
    } else {
      window.alert(`${newName} is already added to phonebook`)
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
      <Persons persons={peopleToShow} />
    </div>
  )
}

export default App