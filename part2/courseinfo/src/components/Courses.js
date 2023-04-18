const Header = ({ name }) => <h1>{name}</h1>;

const Total = ({ parts }) => {

  const total = parts.reduce(
    (accumulator, currentValue) => accumulator + currentValue.exercises,
    0
  );
  return (
    <p><b>total of {total} exercises</b></p>
  );
};




const Part = ({ part }) => {
  return (
    <li>
      {part.name} {part.exercises}
    </li>
  );
};

const Content = ({ parts }) => (
  <ul>
    {parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
  </ul>
);

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

const Courses = ({ courses }) => {
  return (
    <div>
      {courses.map((course) => (
        <Course key={course.id} course={course} />
      ))}
    </div>
  );
};

export default Courses;