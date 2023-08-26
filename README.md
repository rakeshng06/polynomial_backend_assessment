install mysql database by clicking below link
https://dev.mysql.com/downloads/mysql/

set user and password while installing mysql

After installing MYSQL
create database and table by using below commands

create database DATABASENAME;

use DATABASE_NAME;

CREATE TABLE `orders` (
  `identifier` varchar(36) NOT NULL,
  `symbol` varchar(36) NOT NULL,
 `quantity` varchar(36) NOT NULL,
 `filled_quantity` varchar(36) NOT NULL,
 `order_status` varchar(36) NOT NULL
);

BY using above commands DB and TABLE while created

Enter the USERNAME, PASSWORD and DATABASE NAME in server.js file

Data base pool will be created.

////////////////////////////////////////////////////////////////

To install node modules 
Run command : npm install or yarn install
By running above command node modules will be created

To run the server use below command
node server.js

access at port 3001

/////////////////////////////////////////////////////////////////

USE POSTMAN TO SEND API REQUESTS

/////////////////////////////////////////////////////////////////

1) Insert order-service api

POST : http://localhost:3001/insert/order-service

SEND THIS IN BODY : { "symbol": "HDFC", "quantity": 50 }

/////////////////////////////////////////////////////////////////////////

NOTE : while inserting the order-service creating a uuid for identifier to update new_quantity, identifier from database should be taken and passed in the body
2) Update order-service api

POST: http://localhost:3001/update/order-service

SEND THIS IN BODY : {"identifier":"generated uuid from record", "new_quantity":10}

//////////////////////////////////////////////////////////////////////////

3) Delete order-service api

POST : http://localhost:3001/delete/order-service

SEND THIS IN BODY : {"identifier":"generated uuid from record"}

///////////////////////////////////////////////////////////////////////////

4) order-service Status API

POST: http://localhost:3001/order-service/status

SEND THIS IN BODY : {"identifier":"generated uuid from record"}

////////////////////////////////////////////////////////////////////////////
