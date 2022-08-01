import './App.css';
import web3 from './web3';

function App() {
  // console.log(web3.version);
  // getting the account address currently logged into metamask extension
  web3.eth.getAccounts().then(console.log);
  return (
    <>
      <h1>Lottery Contract!</h1>
    </>
  );
}

export default App;
