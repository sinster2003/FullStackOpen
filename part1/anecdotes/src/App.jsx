import { useState } from "react"

const Header = ({title}) => <h1>{title}</h1> 

const App = () => {
  
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well."
  ]
  
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));
  const [max, setMax] = useState(0);
   
  const handleRandom = () => {
    const randNo = Math.floor(Math.random() * anecdotes.length);
    setSelected(randNo);
  }

  const handleVotes = () => {
    setVotes(votes.map((item,index) => (index === selected) ? item += 1: item));
  }

  votes.forEach((item, index) => (item > votes[max]) && setMax(index));

  return (
    <div>
      <Header title="Anecdote of the day"/>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={handleVotes}>vote</button>
      <button onClick={handleRandom}>next anecdote</button>
      
      <Header title="Anecdote with the most votes"/>
      <p>{anecdotes[max]}</p>
      <p>has {votes[max]} votes</p>
    </div>
  )
}

export default App
