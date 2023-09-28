import { useState } from "react";

const Header = ({heading}) => <h1>{heading}</h1>

const Statistics = ({stats}) => {
  return(
    <div>
      <p>good {stats.good}</p>
      <p>neutral {stats.neutral}</p>
      <p>bad {stats.bad}</p>
      <p>all {stats.total}</p>
      <p>average {(stats.total === 0) ? 0 :(stats.good - stats.bad)/ stats.total}</p>
      <p>positive {(stats.total === 0) ? 0 :(stats.good / stats.total) * 100}%</p>
    </div>
  );
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const total = good + neutral + bad;

  const stats = {
    good: good,
    neutral: neutral,
    bad: bad,
    total: total
  }

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
      <Statistics stats={stats}/>
    </div>
  )
}

export default App