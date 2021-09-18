import React,{Fragment, useState} from "react";

const Add = ({entitie, getList}) => {
    var bodyReq = {};
        
    const creatRequest = async() =>{
        try {
            const res = await fetch(`http://localhost:5000/${entitie.toLowerCase()}`,{
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(bodyReq)
            });

            //refresh window after sumbit
            getList();
        } catch (err) {
            console.log(err.message)
        }
    }

    const submitForm = () => {
        
        if(entitie.toLowerCase() == "customer"){
            var formDetails = document.forms.customerForm;
            var formData = new FormData(formDetails);
            bodyReq = {
                "customer_id": ""+formData.get("ID"),
                "first_name": ""+formData.get("fName"),
                "last_name": ""+formData.get("lName"),
                "email": ""+formData.get("email"),
                "gender": ""+formData.get("gender"),
                "country": ""+formData.get("Country"),
                "city": ""+formData.get("City"),
                "street": ""+formData.get("street"),
                "phone": ""+formData.get("phone")
            };
            console.log(bodyReq);

        }else if(entitie == "transactions"){
            var formDetails = document.forms.transactionsForm;
            var formData = new FormData(formDetails);
            bodyReq = {
                "customer_id": ""+formData.get("ID"),
                "cerdit_card_number": ""+formData.get("cerdit_card_number"),
                "total_price": ""+formData.get("total_price"),
                "currency": ""+formData.get("currency")
            };
            
        }else if(entitie == "credit_card"){
            var formDetails = document.forms.credit_cardForm;
            var formData = new FormData(formDetails);
            bodyReq = {
                "cerdit_card_number": ""+formData.get("cerdit_card_number"),
                "customer_id": ""+formData.get("ID"),
                "cerdit_card_type": ""+formData.get("cerdit_card_type")
            };
        }
        console.log(bodyReq);
        console.log(JSON.stringify(bodyReq));

        console.log();
        creatRequest();
        getList();
    }
    
    return (
        <Fragment>
        
        <button type="button" class="btn btn-primary mt-5" data-toggle="modal" data-target="#myModal">
        Add new {entitie}
        </button>

        <div class="modal" id="myModal">
        <div class="modal-dialog">
            <div class="modal-content">

            <div class="modal-header">
                <h4 class="modal-title">Creat a new  {entitie}</h4>
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
            <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={submitForm}>Add</button>
                
                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
            </div>

            </div>
        </div>
        </div>
        </Fragment>
    );
}

export default Add;