const Header = (props) => {
  console.log("Header: ", props)
  return (
    <div>
      <h1>{props.name}</h1>
    </div>
  )
}

const Part = (props) =>{
  console.log("Part: ", props)
  return (
    <div>
      <p>
        {props.name} {props.number}
      </p>
    </div>
  )
}

const Content = ({props}) =>{
  console.log("Content: ", props)
  return (
    <>
      <Part name={props[0].name} number={props[0].exercises} />
      <Part name={props[1].name} number={props[1].exercises} />
      <Part name={props[2].name} number={props[2].exercises} />
    </>
  )
}

const Total = ({props}) =>{
  const sum = props[0].exercises+props[1].exercises+props[2].exercises
  return <p>Number of exercises {sum}</p>
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <div>
      <Header name={course.name}/>
      <Content props={course.parts}/>
      <Total props={course.parts} />
    </div>
  )
}

export default App
