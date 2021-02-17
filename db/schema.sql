DROP DATABASE IF EXISTS burgers_db;

CREATE DATABASE burgers_db;

USE burgers_db;

CREATE TABLE burgers (
  id INT NOT NULL AUTO_INCREMENT,
  burger_name VARCHAR(30) NOT NULL, 
  devoured BIT,
  CONSTRAINT ck_burgers_ischk CHECK (devoured IN (1,0)),
  PRIMARY KEY (id)
);