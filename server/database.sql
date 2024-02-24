CREATE DATABASE emp;

CREATE TABLE details(
    employee_id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    dept VARCHAR(255),
    dob VARCHAR(255),
    gender VARCHAR(255),
    designation VARCHAR(255),
    salary int,
    email VARCHAR(255) UNIQUE,
    prefereddomain VARCHAR(255) ,
    doJ VARCHAR(255),
    address VARCHAR(255),
    experience INT

);