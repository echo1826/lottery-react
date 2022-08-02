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
    </>
  );
}

export default App;
