import React,{Fragment} from 'react';
import './App.css';
// import components
import AddTransaction from "./components/AddTransaction";
import EditTransaction from "./components/EditTransaction";
import UserTabs from "./components/UserTabs";
import GetById from "./components/GetById";
import ListOfTransactions from "./components/ListOfTransactions";



function App() {
  return (
  <Fragment>
    <header>
    <h1 className="text=center mt-5">AcroCharge Billing System</h1>
    </header>
    
    <div className="container">
      <UserTabs/>
      <GetById/>
      <AddTransaction/>
      <ListOfTransactions/>
    </div>
  </Fragment>
  );
}

export default App;
