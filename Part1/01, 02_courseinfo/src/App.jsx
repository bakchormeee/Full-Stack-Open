const Header = (props) => {
  return (
    <div>
      <h1>{props.name}</h1>
    </div>
  )
}

const Part = (props) =>{
  return (
    <div>
      <p>
        {props.name} {props.number}
      </p>
    </div>
  )
}

const Content = () =>{
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  return (
    <>
      <Part name={part1} number={exercises1} />
      <Part name={part2} number={exercises2} />
      <Part name={part3} number={exercises3} />
    </>
  )
}

const Total = (props) =>{
  return (
    <div>
      <p>
        Number of exercises {props.num}
      </p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header name={course}/>
      <Content />
      <Total num={exercises1+exercises2+exercises3}/>
    </div>
  )
}

export default App
