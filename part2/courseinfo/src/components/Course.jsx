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

  const total = parts.reduce((sum, part) => sum + part.exercises,0);

  return(
    <b>
      total of {total} exercises
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

export default Course;