import React,{Fragment, useState} from "react";

const Update = ({oldTransaction,entitie}) => {
   const [transaction, setTransaction] = useState(oldTransaction);

   const updateTrasaction = async (e) =>{
       e.preventDefualt();
        try {
            const body = {transaction};
            
            const res =  await fetch(`http://localhost:5000/transaction/${entitie.toLowerCase()}`,{
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

    //console.log();

    return (
        <Fragment>
        
        <button type="button" class="btn btn-warning" data-toggle="modal" data-target="#myModal">
        Update
        </button>

        <div class="modal" id="myModal">
        <div class="modal-dialog">
            <div class="modal-content">

            <div class="modal-header">
                <h4 class="modal-title">Update {entitie}</h4>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>

            <div class="modal-body">
            {(() => {
                if (entitie == "customer" || entitie == "Customer") {
                    return <form id="customerForm">
                    <div class="form-group">
                        <label for="ID">Customer ID</label>
                        <input type="text" class="form-control" name="ID" id="ID" placeholder="123-45-6789"/>
                    </div>
                    <div class="form-group">
                        <label for="fName">First name</label>
                        <input type="text" class="form-control" name="fName" id="fName" placeholder=""/>
                    </div>
                    <div class="form-group">
                        <label for="lName">Last name</label>
                        <input type="email" class="form-control" name="lName" id="lName"placeholder=""/>
                    </div>
                    <div class="form-group">
                        <label for="email">Email address</label>
                        <input type="email" class="form-control" name="email" id="email1" aria-describedby="emailHelp" placeholder="Enter email"/>
                    </div>
                    <div class="form-group">
                        <label for="gender">Gender</label>
                        <input type="text" class="form-control" name="gender" id="gender"/>
                    </div>
                    <div class="form-group">
                        <label for="Country">Country</label>
                        <input type="text" class="form-control" name="Country" id="Country"/>
                    </div>
                    <div class="form-group">
                        <label for="City">City</label>
                        <input type="text" class="form-control" name="street" id="street"/>
                    </div>
                    <div class="form-group">
                        <label for="street">Street</label>
                        <input type="text" class="form-control" name="street" id="street"/>
                    </div>
                    <div class="form-group">
                        <label for="phone">Phone number</label>
                        <input type="text" class="form-control" name="phone" id="phone"/>
                    </div>
                    </form>
                    ;
                } else if(entitie == "transactions"){
                    return <form id="transactionsForm">
                    <div class="form-group">
                        <label for="ID">Customer ID</label>
                        <input type="text" class="form-control" name="ID" id="ID" placeholder="123-45-6789"/>
                    </div>
                    <div class="form-group">
                        <label for="cerdit_card_number">Card Number</label>
                        <input type="text" class="form-control" name="cerdit_card_number" id="cerdit_card_number" placeholder=""/>
                    </div>
                    <div class="form-group">
                        <label for="total_price">Total Price</label>
                        <input type="text" class="form-control" name="total_price" id="total_price"placeholder=""/>
                    </div>

                    <div class="form-group">
                        <label for="currency">currency</label>
                        <input type="text" class="form-control" name="currency" id="currency"/>
                    </div>
                    </form>
                    ;
                }else if(entitie == "credit_card"){
                    return <form id="credit_cardForm">

                    <div class="form-group">
                        <label for="cerdit_card_number">Card Number</label>
                        <input type="text" class="form-control" name="cerdit_card_number" id="cerdit_card_number" placeholder=""/>
                    </div>

                    <div class="form-group">
                        <label for="ID">Customer ID</label>
                        <input type="text" class="form-control" name="ID" id="ID" placeholder="123-45-6789"/>
                    </div>

                    <div class="form-group">
                        <label for="cerdit_card_type">Card Type</label>
                        <input type="text" class="form-control" name="cerdit_card_type" id="cerdit_card_type"placeholder=""/>
                    </div>
                    </form>
                    ;
                }
            })()}
            </div>

            <div class="modal-footer">
            <button type="button" class="btn btn-warning" data-dismiss="modal" onClick={e => updateTrasaction(e)}>Update</button>
                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
            </div>

            </div>
        </div>
        </div>
        </Fragment>
        
    );
}

export default Update;