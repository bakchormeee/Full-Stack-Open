const PersonForm = ({addPerson, newName, handleNameChange, newNumber, handleNumChange}) => {
    <form onSubmit={addPerson}>
        <div>
            <h2>Add a new</h2>
            name: 
            <input value={newName} onChange={handleNameChange}/>
            <br/>
            number:
            <input value={newNumber} onChange={handleNumChange}/>
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>
}

export default PersonForm