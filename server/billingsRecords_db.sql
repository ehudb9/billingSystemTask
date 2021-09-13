CREATE DATABASE billinsRecords

CREATE TABLE transaction(
    customer_id VARCHAR PRIMARY KEY,
    first_name VARCHAR,
    last_name VARCHAR, 
    email VARCHAR,
    gender VARCHAR,
    country VARCHAR,
    city VARCHAR,
    street VARCHAR,
    phone VARCHAR,
    total_price VARCHAR,
    currency VARCHAR,
    cerdit_card_type VARCHAR,
    cerdit_card_number VARCHAR
);