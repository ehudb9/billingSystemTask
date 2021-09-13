const express = require("express");
const app = express();
const cors = require('cors');
const pool = require("./db_connector");

//Middleware
app.use(cors());
app.use(express.json());

//transaction ROUTS//

// Create a new transaction.
app.post("/transaction", async (req,res) => {
    try {
        console.log(req.body);
        //TODO : how to get the JSON the the table--->many values
        const {transaction} = req.body;
        const newTransacrion = await pool.query("INSERT INTO transaction VALUES($1) RETURNING *", 
        [transaction]);

        res.json(newTransacrion.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});
// Get a transaction
app.get("/transaction/:id", async (req,res) => {
    try {
        console.log(req.params);
        const {id} = req.params;
        const transacrion = await pool.query("SELECT * FROM transaction WHERE customer_id = $1", 
        [id]);

        res.json(transacrion.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// Update a transaction.
app.put("/transaction/:id", async (req,res) => {
    try {
        console.log(req.params);
        const {id} = req.params;
        const {transactionDetails} = req.body;
        //TODO : TBC  --missing updated attributes
        const updatedTransacrion = await pool.query("UPDATE transaction SET transaction = $1 WHERE customer_id = $2", 
        [transactionDetails, id]); 

        res.json(updatedTransacrion.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// Delete a transaction.
app.delete("/transaction/:id", async (req,res) => {
    try {
        console.log(req.params);
        const {id} = req.params;
        const deletedTransacrion = await pool.query("DELETE FROM transaction WHERE customer_id = $1", 
        [id]); 

        res.json(deletedTransacrion.rows[0] + " deleted!");
    } catch (err) {
        console.error(err.message);
    }
});

// View all transactions.
app.get("/transaction", async (req,res) => {
    try {
        const allTransacrion = await pool.query("SELECT * FROM transaction");
        res.json(newTransacrion.rows);
    } catch (err) {
        console.error(err.message);
    }
});
app.listen(5000, () =>{
    console.log("The server started to listen on p.5000");
})