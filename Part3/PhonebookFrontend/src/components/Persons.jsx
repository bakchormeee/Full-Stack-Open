import axios from 'axios'

const baseurl = "http://localhost:3001/persons"

const onDelete = ({person, persons, setPersons}) => {
  return () => {
    alert(`Delete ${person.name}?`)
    axios.delete(`${baseurl}/${person.id}`)
    setPersons(persons.filter(i => i.id !== person.id))
  }
}

const Persons = ({persons, setPersons}) => {
    return (
      <div>
        {persons.map(person => 
          <div key={person.name}>
            {person.name} {person.number} 
            <button onClick={onDelete({person:person, persons:persons, setPersons:setPersons})}>delete</button>
          </div>
        )}
      </div>
    )
}

export default Persons