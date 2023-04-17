import { useState } from "react";

const Button = (props) => {
  return <button onClick={props.function}>{props.text}</button>;
};

const AnecdoteOfTheDay = (props) => {
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[props.selected]}</p>
      <p>has {props.votes[props.selected]} votes</p>
    </div>
  );
};

const MostLikedAnecdote = (props) => {
  let indexOfMaxValue = props.votes.reduce(
    (iMax, x, i, arr) => (x > arr[iMax] ? i : iMax),
    0
  );
  if (props.votes.every((vote) => vote === 0)) {
    return <p>No votes yet</p>;
  }
  return (
    <div>
      <h1>Anecdote with most votes</h1>
      <p>{props.anecdotes[indexOfMaxValue]}</p>
      <p>has {props.votes[indexOfMaxValue]} votes</p>
    </div>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const chooseAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  const vote = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  };

  return (
    <div>
      <AnecdoteOfTheDay
        anecdotes={anecdotes}
        votes={votes}
        selected={selected}
      />
      <Button function={vote} text="vote" />
      <Button function={chooseAnecdote} text="next anecdote" />
      <MostLikedAnecdote votes={votes} anecdotes={anecdotes} />
    </div>
  );
};

export default App;
