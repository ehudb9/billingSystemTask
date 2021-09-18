import React,{Fragment, useState} from "react";

const Update = ({entitie, rowData ,refreshTable}) => {

    const [updateData, setUpdateData] = useState(rowData);
    
    var updateBody = {};

    const updateJsonData = async () =>{
        console.log(updateBody);
        try {
            if(entitie == "customer" || entitie == "Customer") {
                var qurey = `http://localhost:5000/edit/${entitie}/customer_id/${rowData.customer_id}/`;
            }else if(entitie == "transactions"){               
                var qurey = `http://localhost:5000/edit/${entitie}/trans_id/${rowData.trans_id}/`;
            }
            console.log(qurey);
            const res =  await fetch(qurey,{
                    method: "PUT",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(updateBody)
            })
            refreshTable();
        } catch (err) {
            console.log(err.message);
        }
   }

   return (
        <Fragment>
        {(() => {
            if(entitie == "customer" || entitie == "Customer") {
                return <Fragment>
                <button type="button" class="btn btn-warning" data-toggle="modal" data-target={`#id${rowData.customer_id}`}>
                Update
                </button>
                <div class="modal" id={`id${rowData.customer_id}`}>
                <div class="modal-dialog">
                    <div class="modal-content">

                    <div class="modal-header">
                        <h4 class="modal-title">Update {entitie}</h4>
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>

                    <div class="modal-body">
                        <form id="customerUpdateForm">
                        <div class="form-group">
                            <p> Customer ID : <br/>{rowData.customer_id}</p>
                        </div>
                        <div class="form-group">
                            <label for="fName">First name</label>
                            <input type="text" class="form-control" name="fName" id="fName" placeholder={rowData.first_name} onChange={e => {updateBody["first_name"] = e.target.value;}}/>
                        </div>
                        <div class="form-group">
                            <label for="lName">Last name</label>
                            <input type="email" class="form-control" name="lName" id="lName" placeholder={rowData.last_name} onChange={e => {updateBody["last_name"] = e.target.value;}}/>
                        </div>
                        <div class="form-group">
                            <label for="email">Email address</label>
                            <input type="email" class="form-control" name="email" id="email1" aria-describedby="emailHelp" placeholder={rowData.email} onChange={e => {updateBody["email"] = e.target.value;}}/>
                        </div>
                        <div class="form-group">
                            <label for="gender">Gender</label>
                            <input type="text" class="form-control" name="gender" id="gender" placeholder={rowData.gender} onChange={e => {updateBody["gender"] = e.target.value;}}/>
                        </div>
                        <div class="form-group">
                            <label for="Country">Country</label>
                            <input type="text" class="form-control" name="Country" id="Country" placeholder={rowData.country} onChange={e => {updateBody["country"] = e.target.value;}}/>
                        </div>
                        <div class="form-group">
                            <label for="city">City</label>
                            <input type="text" class="form-control" name="city" id="city" placeholder={rowData.city} onChange={e => {updateBody["city"] = e.target.value;}}/>
                        </div>
                        <div class="form-group">
                            <label for="street">Street</label>
                            <input type="text" class="form-control" name="street" id="street" placeholder={rowData.street} onChange={e => {updateBody["street"] = e.target.value;}}/>
                        </div>
                        <div class="form-group">
                            <label for="phone">Phone number</label>
                            <input type="text" class="form-control" name="phone" id="phone" placeholder={rowData.phone} onChange={e => {updateBody["phone"] = e.target.value;}}/>
                        </div>
                        </form>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-warning" data-dismiss="modal" onClick={e => updateJsonData(e)}>Update</button>
                        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                    </div>

                    </div>
                </div>
                </div></Fragment>;
            }else if(entitie == "transactions"){
                return <Fragment> <button type="button" class="btn btn-warning" data-toggle="modal" data-target={`#id${rowData.trans_id}`}>
                Update
                </button>
                <div class="modal" id={`id${rowData.trans_id}`}>
                <div class="modal-dialog">
                    <div class="modal-content">

                    <div class="modal-header">
                        <h4 class="modal-title">Update {entitie}</h4>
                        <button type="button" class="close" data-dismiss="modal" >&times;</button>
                    </div>

                    <div class="modal-body">
                        <form id="transactionsUpdateForm">
                            <div class="form-group">
                                <p>serial ID :<br/> {rowData.trans_id}</p>
                            </div>
                            <div class="form-group">
                                <p>Customer ID :<br/> {rowData.customer_id}</p>
                            </div>
                            <div class="form-group">
                                <label for="cerdit_card_number">Card Number</label>
                                <input type="text" class="form-control" name="cerdit_card_number" id="cerdit_card_number" placeholder={rowData.cerdit_card_number} onChange={e => {updateBody["cerdit_card_number"]= parseInt(e.target.value);}} />
                            </div>
                            <div class="form-group">
                                <label for="total_price">Total Price</label>
                                <input type="text" class="form-control" name="total_price" id="total_price" placeholder={rowData.total_price} onChange={e => {updateBody["total_price"] = e.target.value;}}/>
                            </div>

                            <div class="form-group">
                                <label for="currency">currency</label>
                                <input type="text" class="form-control" name="currency" id="currency" placeholder={rowData.currency} onChange={e => {updateBody["currency"] = e.target.value;}}/>
                            </div>
                        </form>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-warning" data-dismiss="modal" onClick={() => updateJsonData()}>Update</button>
                        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                    </div>

                    </div>
                </div>
                </div></Fragment>;
            }
        })()} </Fragment>
    );
}

export default Update;