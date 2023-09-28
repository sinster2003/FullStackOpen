import { useState } from "react";

const Header = ({heading}) => <h1>{heading}</h1>

const Statisticline = ({text, value}) => {
  return(
    <tr>
      <td>
        {text} 
      </td>
      <td>
        {value}
      </td>
    </tr>
  )
}

const Statistics = ({stats}) => {
  return(
    <div>
      <table>
        <tbody>
            <Statisticline text="good" value={stats.good}/>          
            <Statisticline text="neutral" value={stats.neutral}/>          
            <Statisticline text="bad" value={stats.bad}/>          
            <Statisticline text="all" value={stats.total}/>                      
            <Statisticline text="average" value={(stats.good - stats.bad)/ stats.total}/>                      
            <Statisticline text="positive" value={(stats.good / stats.total) * 100 + " %"}/>
        </tbody>
      </table>
    </div>
  );
}

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

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
      <Button handleClick={handleGood} text="good"/>
      <Button handleClick={handleNeutral} text="neutral"/> 
      <Button handleClick={handleBad} text="bad"/>
      <Header heading="statistics"/>
      {(total === 0) ? <p>No feedback given</p>: <Statistics stats={stats}/>}
    </div>
  )
}

export default App