import React,{Fragment, useState} from "react";

const EditTransaction = ({oldTransaction}) => {
   const [transaction, setTransaction] = useState(oldTransaction);

   const updateTrasaction = async (e) =>{
       e.preventDefualt();
        try {
            const body = {transaction};
            const res =  await fetch(`http://localhost:5000/transaction/${transaction.customer_id}`,{
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })

            console.log(res);
            window.location = "/";
        } catch (err) {
            console.log(err.message);
        }
   }

    return (
        <Fragment>
        
        <button type="button" class="btn btn-warning" data-toggle="modal" data-target={`id${transaction.customer_id}`}>
        Update
        </button>

        <div class="modal" id={`id${oldTransaction.customer_id}`}>
        <div class="modal-dialog">
            <div class="modal-content">

            <div class="modal-header">
                <h4 class="modal-title">updating transaction</h4>
                <button type="button" class="close" data-dismiss="modal" onClick={() => setTransaction(transaction)}>&times;</button>
            </div>

            <div class="modal-body">
                <form>
                    <input type="text" className="form-control" value={transaction} onChange={e => setTransaction(e.target.value)} />
                </form>
            </div>

            <div class="modal-footer">
                <button type="button" class="btn btn-warning" data-dismiss="modal" onClick={e => updateTrasaction(e)}>Update</button>
                
                <button type="button" class="btn btn-danger" data-dismiss="modal" onClick={e => updateTrasaction(oldTransaction)}>Close</button>
            </div>

            </div>
        </div>
        </div>
        </Fragment>
    );
}

export default EditTransaction;