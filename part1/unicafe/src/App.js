import { useState } from "react";

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  );
};

const Statistics = (props) => {
  const average = (good, neutral, bad) => {
    return (good - bad) / (good + neutral + bad);
  };

  const positive = (good, neutral, bad) => {
    return (good / (good + neutral + bad)) * 100;
  };

  if (props.good + props.neutral + props.bad === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    );
  }
  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="good" value={props.good} />
          <StatisticLine text="neutral" value={props.neutral} />
          <StatisticLine text="bad" value={props.bad} />
          <tr>
            <td>all</td>
            <td>{props.good + props.neutral + props.bad}</td>
          </tr>
          <tr>
            <td>average</td>
            <td>{average(props.good, props.neutral, props.bad)}</td>
          </tr>
          <tr>
            <td>positive</td>
            <td>{positive(props.good, props.neutral, props.bad)}%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const Button = (props) => {
  return <button onClick={props.function}>{props.text}</button>;
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const addGood = () => {
    setGood(good + 1);
  };

  const addNeutral = () => {
    setNeutral(neutral + 1);
  };

  const addBad = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button function={addGood} text="good" />
      <Button function={addNeutral} text="neutral" />
      <Button function={addBad} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
