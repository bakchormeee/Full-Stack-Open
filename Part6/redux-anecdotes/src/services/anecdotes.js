const baseURL = 'http://localhost:3001/anecdotes'
const getId = () => (100000 * Math.random()).toFixed(0)

const getAll = async () => {
  const response = await fetch(baseURL)

  if(!response.ok){
    throw new Error('Failed to fetch notes')
  }

  return await response.json()
}

const createNew = async (content) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({
      "content": content,
      "id": getId(),
      "votes": 0
    })
  }

  const response = await fetch(baseURL, options)

  if(!response){
    throw new Error('Failed to create note')
  }

  return await response.json()
}

const increaseVote = async (id) => {
  const anecdotes = await getAll()
  const specificAnecdote = anecdotes.find(anecdote => anecdote.id === id)
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({
      "content": specificAnecdote.content,
      "id": id,
      "votes": specificAnecdote.votes+1
    })
  }
  const response = await fetch(`${baseURL}/${id}`, options)

  if(!response){
    throw new Error('Failed to modify note')
  }

  return await response.json()
}

export default { getAll, createNew, increaseVote }