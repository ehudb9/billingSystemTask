import React,{Fragment, useState} from "react";
import Delete from "./Delete";
import Update from "./Update";


const Table = ({entitie, jsonData ,getList}) => {

    const handleDelete = async(idToDelete) => {
        const path =`http://localhost:5000/${entitie}/${idToDelete}`;
        try {
            const deleteRequest = await fetch(path, {
                method: "DELETE"
            });
        } catch (err) {
            console.log(err.message);
        }
        getList();
    }

    const refreshTable = () =>{
        getList();
    }
    return (
        <Fragment>
            {(() => {
            if (entitie == "customer" || entitie == "Customer") {
                return <table class="table text-center mt-5">
                <thead>
                 <tr key="ID">
                        <th>ID</th>
                        <th>first name</th>
                        <th>last name</th>
                        <th> </th>
                        <th> </th>
                    </tr>                                        
                </thead>
                <tbody>
                {jsonData.map(jsonData => (
                    <tr key={jsonData.customer_id}>
                        < td>{jsonData.customer_id}</td>
                        <td>{jsonData.first_name}</td>
                        <td>{jsonData.last_name}</td>
                        <td>
                            <Update entitie={entitie} rowData={jsonData} refreshTable={refreshTable}/>
                        </td>
                        <td>
                            <button className="btn btn-danger" onClick={() => handleDelete(jsonData.customer_id)}>Delete</button>
                        </td>
                    </tr>
                ))} 
                </tbody>
            </table>;
            } else if(entitie == "transactions"){
                return <table class="table text-center mt-5">
                <thead>
                 <tr key="ID">
                        <th>Serial ID</th>
                        <th>Total Price</th>
                        <th>currency</th>
                        <th> </th>
                        <th> </th>
                    </tr>                                        
                </thead>
                <tbody>
                {jsonData.map(jsonData => (
                    <tr key={jsonData.customer_id}>
                        < td>{jsonData.trans_id}</td>
                        <td>{jsonData.total_price}</td>
                        <td>{jsonData.currency}</td>
                        <td>
                            <Update entitie={entitie} rowData={jsonData} refreshTable={refreshTable}/>
                        </td>
                        <td>
                            <button className="btn btn-danger" onClick={() => handleDelete(jsonData.trans_id)}>delete</button>
                        </td>
                    </tr>
                ))} 
                </tbody>
            </table>;
            }else if(entitie == "credit_card"){
                return <table class="table text-center mt-5">
                <thead>
                 <tr key="ID">
                        <th>Card Number</th>
                        <th>Customer ID</th>
                        <th>Type</th>
                        <th> </th>
                        <th> </th>
                    </tr>                                        
                </thead>
                <tbody>
                {jsonData.map(jsonData => (
                    <tr key={jsonData.cerdit_card_number}>
                        < td>{jsonData.cerdit_card_number}</td>
                        <td>{jsonData.customer_id}</td>
                        <td>{jsonData.cerdit_card_type}</td>
                        <td>     
                        </td>
                        <td>
                            <Delete entitie={entitie} jsonData={jsonData}/>
                        </td>
                    </tr>
                ))} 
                </tbody>
            </table>;
            }
            })()}
        </Fragment>
    );
}

export default Table;
