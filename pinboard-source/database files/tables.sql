--Tables for CMPT 350 project
/*
Tables created here are for PinBoard CMPT350 Project 
This project is being developed by Andrew Magnus, Evan Closson, and Joseph Gates
*/

BEGIN;

DROP TABLE IF EXISTS login_table CASCADE;
DROP TABLE IF EXISTS pin_table CASCADE;

/*
This table is used for the optional login, that doesnt use facebook
*/
CREATE TABLE login_table (
email varchar(255) NOT NULL,
password varchar(255) NOT NULL,
PRIMARY KEY (email)
);

/*
Stores all the information about pins that one might need
A pin_id is used for easier access for updating of pins, when a pin is updated it does
not need to be referenced by its email/title/lat/lng, just its ID
*/
CREATE TABLE pin_table(
id serial NOT NULL,
email varchar(255) NOT NULL,
title varchar(255) NOT NULL,
address varchar(255), 
lat double NOT NULL,
lng double NOT NULL,
description text NOT NULL, 
isVisited boolean NOT NULL,
PRIMARY KEY(id)
);

COMMIT;