const Course = ({course}) => {
    return (
      <div>
        <h3>{course.name}</h3>
        {course.parts.map(item => 
          <div key={item.id}>
            {item.name} {item.exercises}
          </div>
        )}
        <TotalEx course={course} />
      </div>
    )
}
  
const TotalEx = ({course}) => {
    const total = course.parts.reduce((acc, curitem) => {
        console.log(acc, curitem)
        return acc + curitem.exercises
    }, 0)
    return (
        <b>total of {total} exercises</b>
    )
}

export default Course
