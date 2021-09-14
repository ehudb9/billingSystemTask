import React,{Fragment} from 'react';
import './App.css';
// import components
import Add from "./components/Add";
import Update from "./components/Update";
import UserTabs from "./components/UserTabs";
import ListOfTransactions from "./components/ListBySearch";



function App() {
  return (
  <Fragment>
  <div class="d-flex justify-content-center">
    <h1>AcroCharge Billing System</h1></div>
    <div className="container">
      <UserTabs/>
    </div>
  </Fragment>
  );
}

export default App;
