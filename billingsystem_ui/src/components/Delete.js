import React,{Fragment, useState, useEffect} from "react";

const Delete = ({entitie, jsonData}) => {
    
    const deleteRow = async() => {
        // try {
        //     const deletePath = await fetch(`http://localhost:5000/transaction/${id}`, {
        //         method: "DELETE"
        //     });
        //     //refresh after delete
        //     setJsonData(jsonData.filter(jsonData => jsonData.costumer_id !== id));
        // } catch (err) {
        //     console.log(err.message);
        // }
    }

    return (
        <Fragment>
        
            <button className="btn btn-danger" onClick={() => deleteRow()}>delete</button>
                   
        </Fragment>
    );
}

export default Delete;