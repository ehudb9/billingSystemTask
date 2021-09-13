import React,{Fragment, useState} from "react";

const AddTransaction = () => {
    const [id, setId] = useState("type ID");
    //TODO : TBC-TEmplate---->>change id to the right attribute!
    const onSubmitForm = async(e) =>{
        e.preventDefault();
        try {
            const body = {id};
            const res = await fetch("http://localhost:5000/transaction",{
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            //refresh window after sumbit
            window.location = "/";
        } catch (err) {
            console.log(err.message)
        }
    }
    return (
        <Fragment>
        
        <form className="d-flex mt-5" onSubmit = {onSubmitForm}>
            <input className="form-control" type="text" value={id} onChange={e => setId(e.target.value)}/>
            <button className="btn-btn-success">Get transactions</button>
            </form>
        </Fragment>
    );
}

export default AddTransaction;