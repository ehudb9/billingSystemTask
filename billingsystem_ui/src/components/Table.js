import React,{Fragment, useState, useEffect} from "react";
import Delete from "./Delete";
import Update from "./Update";


const Table = ({entitie, jsonData}) => {

    
    return (
        <Fragment>
        <table class="table text-center mt-5">
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
                        <button className="btn btn-warning"> update</button>
                    </td>
                    <td>
                        <Delete entitie={entitie} jsonData={jsonData}/>
                    </td>
                </tr>
            ))} 
            </tbody>
        </table>
        </Fragment>
    );
}

export default Table;
