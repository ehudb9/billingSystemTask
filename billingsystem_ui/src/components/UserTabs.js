import React,{Fragment, useState} from "react";

// import components
import ListBySearch from "./ListBySearch";


const UserTabs = () => {
    const [entitie, setEntitie] = useState("Customer");
    const handleChoise = (newEntitie) => {
        console.log(newEntitie);
        setEntitie(newEntitie);
    }

    return (
        <Fragment>

            <nav>
                <div class="nav nav-tabs" id="nav-tab" role="tablist">
                        <a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true" onClick={()=>handleChoise("Customer")}>Customer</a>
                        <a class="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false"onClick={()=>handleChoise("credit_card")}>Credit cards</a>
                        <a class="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false"  onClick={()=>handleChoise("transactions")}>Transactions</a>
                </div>
                    </nav>

            <ListBySearch entitie={entitie}/>
            
        </Fragment>
    );
}

export default UserTabs;