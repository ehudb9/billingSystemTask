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
app.post("/credit-card", async (req,res) => {
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
app.post("/transaction", async (req,res) => {
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

//TODO: Get a transaction by serial ID or customer_id or cerdit_card_number
//TODO: to make all the routs generic rout like  that.
//Get a transaction by customer_id 
app.get("/get-transaction/:getByParameter/:id/", async (req, res) => {    
    try {
        console.log(req.params.id);
        console.log(req.params.getByParameter);
        const response = await pool.query(`SELECT * FROM transactions WHERE ${req.params.getByParameter} = ${req.params.id}`);
        res.json(response.rows);
    } catch (err) {
        console.error(err.message);
    }
});
//===========UPDATES================//

// Update a customer.

// Update a credit card.

// Update a transaction.
app.put("/transaction/:id", async (req,res) => {
    try {
        console.log(req.params);
        //const {trans_id} = req.params;
        //const transactionDetails = req.body;
        console.log(req.body);
        for (var i = 0; i < req.body.length; i++){
            var obj = req.body[i];
            for (var key in obj){
              var value = obj[key];
              console.log(key+ ": " + value);
              //const updatedTransacrion = await pool.query("UPDATE transaction SET transaction = $1 WHERE trans = $2", 
              //[transactionDetails, trans_id]); 
            }
          }

        //res.json(updatedTransacrion.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//===========DELETING================//

// Delete a customer
//cascade

// Delete a credit-card


// Delete a transaction.
app.delete("/transaction/:id", async (req,res) => {
    try {
        console.log(req.params);
        const {id} = req.params;
        const deletedTransacrion = await pool.query("DELETE FROM transactions WHERE trans_id = $1", 
        [id]); 

        res.json(deletedTransacrion.rows[0] + " deleted!");
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
app.get("/get-all-customer", async (req,res) => {
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
app.get("/get-all-transaction", async (req,res) => {
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