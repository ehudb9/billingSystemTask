import React,{Fragment, useState, useEffect} from "react";
import EditTransaction from "./EditTransaction";

const ListOfTransactions = () => {
    const [transaction, setTransaction] = useState([]);

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
            <h2>List of transaction</h2>

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
                            <EditTransaction transaction={transaction} />
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

export default ListOfTransactions;