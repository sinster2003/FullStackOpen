const Header = ({title}) => <h1>{title}</h1>

const Part = ({content}) => <p>{content.name} {content.exercises}</p>

const Content = ({parts}) => {
  return(
    <div>
      {
        parts.map(part => <Part key={part.id} content={part}/>)
      }
    </div>
  );
}

const Total = ({parts}) => {

  let sum = 0;

  parts.forEach(part => sum += part.exercises);

  return(
    <b>
      total of {sum} exercises
    </b>
  );
}

const Course = ({course}) => {
  return(
    <div>
      <Header title={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  );
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      },
    ]
  }

  return <Course course={course} />
}

export default App