import React,{Fragment, useState, useEffect} from "react";
import Table from "./Table";
import GetById from "./GetById";

const ListBySearch = ({entitie}) => {
    const [jsonData, setJsonData] = useState([]);
    const [id, setId] = useState("Enter ID: 123-123-123");
    const [searchParams, setSearchParams] = useState(["Customer ID"]);

    const onSubmitForm = async(e) =>{
        e.preventDefault();
        console.log(entitie);
        getJsonData();
    }
    
    const getJsonData = async() => {
        var path = "http://localhost:5000";
        try {
            if(searchParams == "view_all"){
                path += "/get-all/" + entitie;
            }else{
                path += "/get-by-parameters/" + entitie + "/" + searchParams + "/" + id;
            }
            console.log(path);
            const res = await fetch(path);
            const jsonResponse = await res.json();
            setJsonData(jsonResponse);
            console.log(jsonData);
        } catch (err) {
            console.log(err.message);
        }
    }
    
    
   
    useEffect(() => {
        getJsonData();
    }, []);
    
    return (
        <Fragment>
            <div class="container mt-5">
            <h2>List of {entitie}</h2>
           
            <nav aria-label>
            <div class="nav nav-tabs" id="nav-tab" role="tablist">
                <a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true" onClick={()=>setSearchParams("customer_id")}>Customer ID</a>
                <a class="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false"onClick={()=>setSearchParams("credit_card_number")}>Credit number</a>
                <a class="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false"onClick={()=>setSearchParams("trans_id")}>Transaction serival ID</a>
                <a class="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false"onClick={()=>setSearchParams("view_all")}>View all</a>
            </div>
            </nav>
            <form className="d-flex mt-5" onSubmit = {onSubmitForm}>            
            <input className="form-control" type="text" value={id} onChange={e => setId(e.target.value)}/>
            <button className="btn btn-success">Get {entitie} by {searchParams}</button>
            </form>
            <Table/>
            
            </div>
        </Fragment>
    );
}

export default ListBySearch;