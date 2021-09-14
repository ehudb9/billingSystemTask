import React,{Fragment, useState} from "react";

const GetById = ({entitie}) => {
    const [id, setId] = useState("Enter ID: 123-123-123");
    const [searchParams, setSearchParams] = useState([]);

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
        <div class="dropdown">
            <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
                Search by
            </button>
            <div class="dropdown-menu">
                <a class="dropdown-item" href="#">Link 1</a>
                <a class="dropdown-item" href="#">Link 2</a>
                <a class="dropdown-item" href="#">Link 3</a>
            </div>
            </div>
            <input className="form-control" type="text" value={id} onChange={e => setId(e.target.value)}/>
            <button className="btn btn-success">Get {entitie}</button>
            </form>
        </Fragment>
    );
}

export default GetById;