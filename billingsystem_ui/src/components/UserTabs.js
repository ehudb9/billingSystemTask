import React,{Fragment, useState} from "react";

const UserTabs = () => {
    return (
        <Fragment>
        
        <nav class="nav nav-pills nav-fill mt-5">
        <a class="nav-item nav-link active" href="#">Transactions</a>
        <a class="nav-item nav-link" href="#">Costumers</a>
        </nav>
        </Fragment>
    );
}

export default UserTabs;