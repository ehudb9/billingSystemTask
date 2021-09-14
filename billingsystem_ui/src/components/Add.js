import React,{Fragment, useState} from "react";

const Add = ({entitie}) => {
    
    return (
        <Fragment>
        
        <button type="button" class="btn btn-primary mt-5" data-toggle="modal" data-target="#myModal">
        Add new {entitie}
        </button>

        <div class="modal" id="myModal">
        <div class="modal-dialog">
            <div class="modal-content">

            <div class="modal-header">
                <h4 class="modal-title">Modal Heading</h4>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>

            <div class="modal-body">
                <form>
                    <input type="text" className="form=control" />
                </form>
            </div>

            <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-dismiss="modal">Add</button>
                
                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
            </div>

            </div>
        </div>
        </div>
        </Fragment>
    );
}

export default Add;