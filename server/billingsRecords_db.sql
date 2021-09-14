CREATE DATABASE billingsRecords

CREATE TABLE IF NOT EXISTS customer(
    customer_id VARCHAR PRIMARY KEY,
    first_name VARCHAR,
    last_name VARCHAR, 
    email VARCHAR,
    gender VARCHAR,
    country VARCHAR,
    city VARCHAR,
    street VARCHAR,
    phone VARCHAR
);


CREATE TABLE IF NOT EXISTS credit_card(
    cerdit_card_number BIGINT PRIMARY KEY,
    customer_id VARCHAR ,
    cerdit_card_type VARCHAR,
    CONSTRAINT fk_customer FOREIGN KEY(customer_id) REFERENCES customer(customer_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS transactions(
    trans_id BIGSERIAL PRIMARY KEY,
    customer_id VARCHAR,
    cerdit_card_number BIGINT,
    total_price REAL,
    currency VARCHAR,
    CONSTRAINT fk_customer_trans FOREIGN KEY(customer_id) REFERENCES customer(customer_id) ON DELETE CASCADE
);
