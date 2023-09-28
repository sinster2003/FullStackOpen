import { useState } from "react";

const Header = ({heading}) => <h1>{heading}</h1>

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const total = good + neutral + bad;

  const handleGood = () => {
    setGood(good + 1);
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1);
  }

  const handleBad = () => {
    setBad(bad + 1);
  }

  return (
    <div>
      <Header heading="give feedback"/>
      <button onClick={handleGood}>good</button>
      <button onClick={handleNeutral}>neutral</button>
      <button onClick={handleBad}>bad</button>

      <Header heading="statistics"/>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {total}</p>
      <p>average {(total === 0) ? 0 :(good - bad)/ total}</p>
      <p>positive {(total === 0) ? 0 :(good / total) * 100}%</p>
    </div>
  )
}

export default App