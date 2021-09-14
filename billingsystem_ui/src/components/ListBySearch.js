import React,{Fragment, useState, useEffect} from "react";
import Update from "./Update";
import GetById from "./GetById";

const ListBySearch = ({entitie}) => {
    const [transaction, setTransaction] = useState([]);
    const [id, setId] = useState("Enter ID: 123-123-123");
    const [searchParams, setSearchParams] = useState(["Customer ID"]);


    const onSubmitForm = async(e) =>{
        e.preventDefault();
        try {
            const body = {id};
            const res = await fetch("http://localhost:5000/transaction",{
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            //refresh window after sumbit
            window.location = "/";
        } catch (err) {
            console.log(err.message)
        }
    }

    
    const deleteTransaction = async(id) => {
        try {
            const deleteTrans = await fetch(`http://localhost:5000/transaction/${id}`, {
                method: "DELETE"
            });
            //refresh after delete

            setTransaction(transaction.filter(transaction => transaction.costumer_id !== id));
        } catch (err) {
            console.log(err.message);
        }
    }

    const getTransaction = async() => {
        try {
            const res = await fetch("http://localhost:5000/transaction");
            const jsonResponse = await res.json();
            setTransaction(jsonResponse);
        } catch (err) {
            console.log(err.message);
        }
    }
    
    useEffect(() => {
        getTransaction();
    }, []);
    
    return (
        <Fragment>
            <div class="container mt-5">
            <h2>List of {entitie}</h2>
           
            <nav aria-label>
            <div class="nav nav-tabs" id="nav-tab" role="tablist">
                <a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true" onClick={()=>setSearchParams("customer_id")}>Customer ID</a>
                <a class="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false"onClick={()=>setSearchParams("credit_card_number")}>Credit number</a>
                <a class="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false"onClick={()=>setSearchParams("trans_id")}>Transaction serival ID</a>
                <a class="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false"onClick={()=>setSearchParams("view_all")}>View aall</a>

            </div>
            </nav>
            <form className="d-flex mt-5" onSubmit = {onSubmitForm}>            
            <input className="form-control" type="text" value={id} onChange={e => setId(e.target.value)}/>
            <button className="btn btn-success">Get {entitie}</button>
            </form>

            <table class="table text-center mt-5">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Firstname</th>
                    <th>Lastname</th>
                    <th>total_price</th>
                    <th>currency</th>
                    <th>  </th>
                    <th>  </th>
                </tr>
                </thead>
                <tbody>
                {transaction.map(transaction => (
                    <tr key={transaction.costumer_id}>
                        <td>{transaction.costumer_id}</td>
                        <td>{transaction.first_name}</td>
                        <td>{transaction.last_name}</td>
                        <td>{transaction.total_price}</td>
                        <td>{transaction.currency}</td>
                        <td>
                            <Update transaction={transaction} />
                        </td>
                        <td>
                            <button className="btn btn-danger" onClick={() => deleteTransaction(transaction.costumer_id)}>delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        </Fragment>
    );
}

export default ListBySearch;