const express = require("express");
const app = express();
const cors = require('cors');
const pool = require("./db_connector");

//Middleware
app.use(cors());
app.use(express.json());

//server ROUTS//
//TODO : orginized as a separate module
//===========Posting-New===============//

//Creat a new customer
app.post("/customer", async (req,res) => {
    try {
        const newCustomer = req.body;
        //const json = '{"customer_id": "387-63-2772","first_name": "Ellwood", "last_name": "Speirs", "email": "espeirs1@mediafire.com", "gender": "Male", "country": "Indonesia", "city": "Kiarajangkung", "street": "4368 Sloan Trail", "phone": "660-819-9883"}'
        //const parsed = await JSON.parse(json);
        
        const response = await pool.query("INSERT INTO customer(customer_id, first_name, last_name, email, gender, country, city, street, phone)" +
        " VALUES($1,$2,$3,$4,$5, $6, $7 ,$8, $9) RETURNING *", 
        [newCustomer["customer_id"], newCustomer["first_name"], newCustomer["last_name"], newCustomer["email"], newCustomer["gender"], newCustomer["country"], newCustomer["city"], newCustomer["street"], newCustomer["phone"]]);

        res.json(response.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//Creat a new credit card
app.post("/credit_card", async (req,res) => {
    try {
        const newCreditCard = req.body;
        const response = await pool.query("INSERT INTO credit_card(cerdit_card_number, customer_id, cerdit_card_type)" +
        " VALUES($1,$2,$3) RETURNING *", 
        [newCreditCard["cerdit_card_number"], newCreditCard["customer_id"], newCreditCard["cerdit_card_type"]]);

        res.json(response.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// Create a new transaction.
app.post("/transactions", async (req,res) => {
    try {
        console.log(req.body);
        const newTransaction = req.body;
        const response = await pool.query("INSERT INTO transactions(customer_id, cerdit_card_number, total_price, currency) "+
        "VALUES($1,$2,$3,$4) RETURNING *", 
        [newTransaction["customer_id"], newTransaction["cerdit_card_number"], newTransaction["total_price"], newTransaction["currency"]]);

        res.json(response.rows);
    } catch (err) {
        console.error(err.message);
    }
});


//===========GETTERS================//

// Get a customer by ID
app.get("/customer/:id", async (req,res) => {
    try {
        console.log(req.params);
        const {id} = req.params;
        //console.log(id);
        const response = await pool.query("SELECT * FROM customer WHERE customer_id = $1", [id]);
        //console.log(response);
        res.json(response.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// Get a credit card by cerdit_card_number
app.get("/credit-card-by-cerdit_card_number/:cerdit_card_number", async (req,res) => {
    try {
        console.log(req.params);
        const {cerdit_card_number} = req.params;
        const response = await pool.query("SELECT * FROM credit_card WHERE cerdit_card_number = $1", [cerdit_card_number]);
        res.json(response.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// Get a credit card by customer_id-- can be multiplu cards for each customer
app.get("/credit-card-by-customer_id/:customer_id", async (req,res) => {
    try {
        console.log(req.params);
        const {customer_id} = req.params;
        const response = await pool.query("SELECT * FROM credit_card WHERE customer_id = $1", [customer_id]);
        res.json(response.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// Get a transaction by serial ID
app.get("/transaction-by-serial_id/:id", async (req,res) => {
    try {
        const {id} = req.params;
        const response = await pool.query("SELECT * FROM transactions WHERE trans_id = $1", [id]);
        console.log(response.rows[0]);
        res.json(response.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//Get a transaction by customer_id 
app.get("/get-transaction-by-customer_id/:id/", async (req, res) => {
    try {
        console.log(req.params.id);
        const response = await pool.query("SELECT * FROM transactions WHERE customer_id = $1", [req.params.id]);
        res.json(response.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// Get a transaction by cerdit_card_number
app.get("/transaction-by-cerdit_card_number/:cerdit_card_number/", async (req,res) => {
    try {
        const {cerdit_card_number} = req.params;
        const cardNumber = parseInt(cerdit_card_number);
        const response = await pool.query("SELECT * FROM transactions WHERE cerdit_card_number = $1", [cardNumber]);
        res.json(response.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//Generic getter by patameters:
app.get("/get-by-parameters/:table_name/:getByParameter/:id/", async (req, res) => {    
    try {
        console.log(req.params.id);
        console.log(req.params.getByParameter);
        console.log(req.params.table_name);
        const parameter = req.params.getByParameter;
        const id = req.params.id;
        const query = "SELECT * FROM " + req.params.table_name + " WHERE " + parameter + " = '" + id + "'";
        console.log(query);
        const response = await pool.query(query);
        res.json(response.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//===========UPDATES================//

// Update a customer by id.
app.put("/edit-costumer-by-id/:id/", async (req, res) => {
    try {
        console.log(req.params);
        const id = req.params.id;
        const updateDetails = req.body;
        console.log(updateDetails);
        var response = updateDetails;
        console.log("\nUpdating:->");
        for (var key in updateDetails[0]){
            var value = updateDetails[0][key];
            console.log(key +" : "+ value);
            if(key == "first_name") {
                response = await pool.query("UPDATE customer SET first_name = $1 WHERE customer_id = $2", [value,id]);
            }else if(key=="last_name"){
                response = await pool.query(`UPDATE customer SET last_name = $1 WHERE customer_id = $2`, [value,id]);
            }else if(key=="email"){
                response = await pool.query(`UPDATE customer SET email = $1 WHERE customer_id = $2`, [value,id]);
            }else if(key=="gender"){
                response = await pool.query(`UPDATE customer SET gender = $1 WHERE customer_id = $2`, [value,id]);
            }else if(key=="phone"){
                response = await pool.query(`UPDATE customer SET phone = $1 WHERE customer_id = $2`, [value,id]);
            }
        }
        res.json(response.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//no Update a credit card because the fields are primary- no make sence.

// Update a transaction.
app.put("/edit-transaction-by-id/:id/", async (req, res) => {
    try {
        console.log(req.params);
        const id = req.params.byId;
        const updateDetails = req.body;
        console.log("\nUpdating:->");
        
        for (var key in updateDetails[0]){
            var value = updateDetails[0][key];
            console.log(key +" : "+ value);
            if(key == "customer_id") {
                response = await pool.query("UPDATE transactions SET customer_id = $1 WHERE trans_id = $2", [value,id]);
            }else if(key=="cerdit_card_number"){
                response = await pool.query(`UPDATE transactions SET cerdit_card_number = $1 WHERE trans_id = $2`, [value,id]);
            }else if(key=="total_price"){
                response = await pool.query(`UPDATE transactions SET total_price = $1 WHERE trans_id = $2`, [value,id]);
            }else if(key=="currency"){
                response = await pool.query(`UPDATE transactions SET currency = $1 WHERE trans_id = $2`, [value,id]);
            }
        }
        res.json(updatedFields.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// Update by table name and parametr with new body fields.
app.put("/edit/:table/:parameter_id/:byId/", async (req, res) => {
    try {
        console.log(req.params);
        const id = req.params.byId;
        const parameter = req.params.parameter_id;
        const table_name = req.params.table;
        console.log(table_name);
        const updateDetails = req.body;
        console.log("\nUpdating:->");
        let query = "UPDATE "  + table_name + " SET";
        for (var key in updateDetails[0]){
            
            var value = updateDetails[0][key];
            console.log(key + " : " + value);
            query +=" " + key +" = '"+ value+ "',"; 
            //const updatedFields = await pool.query(`UPDATE ${table_name} SET ${key} = ${value} WHERE ${parameter} = ${id}`);
            // const updatedFields = await pool.query("UPDATE $1 SET $2 = $3 WHERE $4 = $5", [table_name, key ,value ,parameter ,id]);
            //const updatedFields = await pool.query("UPDATE customer SET first_name = $1 WHERE customer_id = $2", [value,id]);
        }
        query = query.slice(0, query.length-1) +  " WHERE " + parameter + " = '" + id + "'";
        console.log(query);
        const updatedFields = await pool.query(query);
        res.json(updatedFields.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//===========DELETING================//

// Delete a customer -- with al related cards and transactions - using cascade
app.delete("/customer/:customer_id/", async (req,res) => {
    try {
        console.log(req.params);
        const {customer_id} = req.params;
        console.log(customer_id);
        const deletedCard = await pool.query("DELETE FROM customer WHERE customer_id = $1", [customer_id]); 
        res.json(deletedCard.rows);
    } catch (err) {
        console.error(err.message);
    }
});


//TODO: update related transactions somehow
// Delete a credit-card
app.delete("/credit_card/:cerdit_card_number", async (req,res) => {
    try {
        console.log(req.params);
        const {cerdit_card_number} = req.params;
        console.log(cerdit_card_number);
        const deletedCard = await pool.query("DELETE FROM credit_card WHERE cerdit_card_number = $1", [cerdit_card_number]); 
        res.json(deletedCard.rows);
        // TODO: make any save for related transactions!
        //----ALTER TABLE transactions DROP CONSTRAINT fk_credit_card;
    } catch (err) {
        console.error(err.message);
    }
});

// Delete a transaction.
app.delete("/transactions/:id", async (req,res) => {
    try {
        console.log(req.params);
        const {id} = req.params;
        const deletedTransacrion = await pool.query("DELETE FROM transactions WHERE trans_id = $1", [id]); 
        res.json(deletedTransacrion.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//=======GETTER FULL TABLE===========//

//View all TABLE by parameter.
app.get("/get-all/:table_name", async (req,res) => {
    try {
        const allcustomers = await pool.query(`SELECT * FROM ${req.params.table_name}`);
        res.json(allcustomers.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// View all customers.
app.get("/get-all-customers", async (req,res) => {
    try {
        const allcustomers = await pool.query("SELECT * FROM customer");
        res.json(allcustomers.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// View all creditcards.
app.get("/get-all-credit-card", async (req,res) => {
    try {
        const allCreditCards = await pool.query("SELECT * FROM credit_card");
        res.json(allCreditCards.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// View all transactions.
app.get("/get-all-transactions", async (req,res) => {
    try {
        const allTransacrion = await pool.query("SELECT * FROM transactions");
        res.json(allTransacrion.rows);
    } catch (err) {
        console.error(err.message);
    }
});


app.listen(5000, () =>{
    console.log("The server started to listen on p.5000");
})