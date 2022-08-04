import "./App.css";
import web3 from "./web3";
import lotteryContract from "./lottery";
import { useEffect, useState } from "react";

function App() {
  const [contractState, setContractState] = useState({
    manager: "",
    players: [],
    balance: ''
  });

  const [input, setInput] = useState({value: ''});
  const [message, setMessage] = useState({message: ''});
  const [winnerMessage, setWinnerMessage] = useState({message: ''});

  async function handleSubmit(event) {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    setMessage({message: 'Waiting on transaction success...'});
    await lotteryContract.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(input.value, 'ether')
    });
    setMessage({message: 'You have been entered'});
    setInput({
      value: ''
    });
  }

  async function pickWinner(event) {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();

    setWinnerMessage({message: 'Waiting on transaction success...'});

    await lotteryContract.methods.pickWinner().send({
      from: accounts[0]
    });

    const winner = await lotteryContract.methods.getWinner().call();

    setWinnerMessage({message: `${winner} has won this current lottery`});
    
    setContractState({
      ...contractState,
      players: [],
      balance: ''
    });

  }

  useEffect(() => {
    async function fetchData() {
      const manager = await lotteryContract.methods.manager().call();
      const players = await lotteryContract.methods.getPlayers().call();
      const balance = await web3.eth.getBalance(lotteryContract.options.address);
      setContractState({ manager, players, balance });
    }
    fetchData();
  }, []);

  return (
    <>
      <h1>Lottery Contract!</h1>
      <p>
        This contract is managed by {contractState.manager}.<br></br>
        There are currently {contractState.players.length} people entered
        competing to win {web3.utils.fromWei(contractState.balance, 'ether')} ether!
      </p>
      <hr/>
      <form onSubmit={handleSubmit}>
        <h4>Want to try your luck?</h4>
        <div>
          <label>Amount of ether to enter</label>
          <input value = {input.value} onChange={(event) => setInput({value: event.target.value})}/>
        </div>
        <button>Enter</button>
      </form>
      <p>{message.message}</p>
      
      <hr/>

      <div>
        <h2>Time to pick a winner?</h2>
        <button onClick={pickWinner}>Pick Winner</button>
      </div>
      <h4>{winnerMessage.message}</h4>
    </>
  );
}

export default App;
