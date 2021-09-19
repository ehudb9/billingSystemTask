# billingSystemTask

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#ToDo">ToDo</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

A basic billing system, which enables the merchant to manage his store.

### Built With

* [Bootstrap](https://getbootstrap.com)
* [postgresql](https://www.postgresql.org/)
* [React](https://laravel.com)
* [Node js](https://nodejs.org)

<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

Before installing, download and install Node.js. Node.js 0.10 or higher is required.
And download and install PostgreSql and create a new database.
* this project init with PostgreSql: 
  ```sh
     user: "postgres",
     password: "12345",
     host: "localhost",
     port: 5432,
     database: "billingsRecords"
  ```
If you have stardet your database with a different details in the following steps you should config your details.

### Installation

2. Clone the repo
   ```sh
   $ git clone https://github.com/ehudb9/billingSystemTask.git
   $ cd billingSystemTask
   ```
3. Install NPM packages
   ```sh
   $ npm install
   $ npm install express
   ```
4. Enter your PostgreSql details in `db_connector.js` 
   ```JS
   const pool = new Pool({
     user: "postgres",
     password: "12345",
     host: "localhost",
     port: 5432,
     database: "billingsRecords"});
    ```

### Run Backend Server

```
$ cd server
$ node index.js
```

### 3. Run Inteface
```
# open new terminal
$ cd billingsystem_ui
$ npm install
$ npm start
```

<!-- USAGE EXAMPLES -->
## Usage

With the interface on your browser: `localhost:3000`.
you can view, add,update customers,transactions,and cards.
<br><br>***NOTE:*** Make sure you are using an existed card number and customer id when you addind a new transaction.

## Todo
   The following tasks will be the next to make the system better ang ,ore efficient with cleaner code.
   * db:
        - [ ] adding password for each customer and secure any change with it/secure the login
        - [ ] adding "vaild" attribute to credit-card TABLE
        - [ ] change type of attributes like credit_card_number to be VARCHAR
        - [ ] adding merchant table with name and password in order to soprt linng stage in the system
        
   * server/index.js:
        - [ ] orginize the routs on a seprate module.
        - [ ] change deleted credit card--> make unvalid card insted of deleting, and save all the related tranactions on a secondary DB (cloud?) or update the relevant transactions somehow
        - [ ] make validation to avoid update primary key.
        - [ ] secuire all customer changes with password fields
        - [ ] add more types of get querys: for example - search all customer's cards/transactions with join tables

    * front-end:
        - [ ] create login stage-> effect the main state/all the componente every merchant/customer with thier password can look for all thier own data
        - [ ] adding variables for each type of tada in order to be able to move between tads on the navbar withput deleting the tables
