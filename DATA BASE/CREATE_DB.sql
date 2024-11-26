CREATE DATABASE pf-db;

USE pf-db;

CREATE TABLE students (
  code INT PRIMARY KEY NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  note1 FLOAT,
  note2 FLOAT,
  note3 FLOAT
);
