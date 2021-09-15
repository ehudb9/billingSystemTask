import React,{Fragment, useState, useEffect} from "react";

const Table = () => {
    /*const deleteRow = async() => {
        try {
            const deletePath = await fetch(`http://localhost:5000/transaction/${id}`, {
                method: "DELETE"
            });
            //refresh after delete
            setJsonData(jsonData.filter(jsonData => jsonData.costumer_id !== id));
        } catch (err) {
            console.log(err.message);
        }
    }*/
    return (
        <Fragment>
        
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
                
                </tbody>
            </table>
            
        </Fragment>
    );
}

export default Table;

/*{jsonData.map(jsonData => (
                    <tr key={jsonData.costumer_id}>
                        <td>{jsonData.costumer_id}</td>
                        <td>{jsonData.first_name}</td>
                        <td>{jsonData.last_name}</td>
                        <td>{jsonData.total_price}</td>
                        <td>{jsonData.currency}</td>
                        <td>
                            <button className="btn btn-warning"> update</button>
                        </td>
                        <td>
                            <button className="btn btn-danger" onClick={() => deleteRow()}>delete</button>
                        </td>
                    </tr>
                ))}*/