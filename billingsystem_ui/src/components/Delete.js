import React,{Fragment, useState, useEffect} from "react";

const Delete = ({entitie, idToDelete}) => {
    //const [jsonData, setJsonData] = useState(prevJsonData);

    const deleteRow = async(path) => {
        try {
            const deletePath = await fetch(path, {
                method: "DELETE"
            });
        } catch (err) {
            console.log(err.message);
        }
    }

    const handleDelete = async() => {
        //console.log(entitie);
        if(entitie == "customer"){
            //var deleteId = jsonData.customer_id;
            //deleteRow(path + deleteId);
            
            //refresh after delete
            //setJsonData(jsonData.filter(jsonData => jsonData.costumer_id !== deleteId));
        }else if(entitie == "transactions"){
            //var deleteId = jsonData.trans_id;
            //const query = path + deleteId;
            //console.log(path);
            // console.log(qurey);
            //deleteRow(query);
            
            //refresh after delete
            //setJsonData(jsonData.filter(jsonData => jsonData.trans_id !== deleteId));

        }else if(entitie == "credit_card"){

        }
        //console.log(deleteId);
    }

    return (
        <Fragment>
        
            <button className="btn btn-danger" onClick={() => handleDelete()}>delete</button>
                   
        </Fragment>
    );
}

export default Delete;