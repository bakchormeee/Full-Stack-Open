import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/messageReducer'


const Anecdote = ({ anecdote, handleVote }) => (
  <div>
    <div>{anecdote.content}</div>
    <div>
      has {anecdote.votes}
      <button onClick={() => handleVote(anecdote.id)}>vote</button>
    </div>
  </div>
)

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)

  console.log(anecdotes)
  const sortedAnecdotes = anecdotes.toSorted((a, b) => b.votes - a.votes)
  const filteredAnecdotes = sortedAnecdotes.filter(anecdote => anecdote.content.includes(filter))

  return (
    <div>
      {filteredAnecdotes.map(anecdote => (<Anecdote 
        anecdote={anecdote}
        handleVote={()=>{
          dispatch(voteAnecdote(anecdote.id))
          dispatch(setNotification(`You voted '${anecdote.content}'`))
        }}
        key={anecdote.id}
        />
      ))}
    </div>
  )
}

export default AnecdoteList