import { useState } from 'react'

const Button = ({func, text}) => {
  return (
    <button onClick={func}>{text}</button>
  )
}

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>

  )
}

const Statistics = (props) => {
  if(props.total === 0){
    return (
      <>
        <h1>statistics</h1>
        <div>No feedback given</div>
      </>
    )
  } else {
    return (
      <>
        <h1>statistics</h1>
        <table>
          <tbody>
            <StatisticLine text="good" value={props.good}/>
            <StatisticLine text="neutral" value={props.neutral}/>
            <StatisticLine text="bad" value={props.bad}/>
            <StatisticLine text="all" value={props.total}/>
            <StatisticLine text="average" value={props.average}/>
            <StatisticLine text="positive" value={props.positive + " %"}/>
          </tbody>
        </table>
      </>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const total = good+neutral+bad

  return (
    <>
      <h1>give feedback</h1>
      <Button func={() => setGood(good+1)} text="good" />
      <Button func={() => setNeutral(neutral+1)} text="neutral" />
      <Button func={() => setBad(bad+1)} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} total={total} average={(good-bad)/total} positive={(good/total)*100} />
   </>
  )
}

export default App