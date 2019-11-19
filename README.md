# Intro
Mark Calder's attempt at the Ecotricity code exercise [hosted on GitHub](https://github.com/ecotricity/hiring/blob/master/API/meters.md).

# Setup
Project is written in NodeJS using Express and has an Azure-hosted cloud SQL Database. 
* You will need NodeJs installed to run the application. 
* To view the database, you can using the credentials supplied to connect to the database. [See here for the guide to download the client tool and connect to the database](https://docs.microsoft.com/en-us/azure/sql-database/sql-database-connect-query-ssms).
* Database credentials supplied privately.
* The repo includes a Postman collection to allow you to test the APIs [download Postman](https://getpostman.com). There is also a [guide on importing the collection](https://learning.getpostman.com/docs/postman/collections/data-formats/#importing-postman-data) into Postman.


# Repository
You can [clone the repository from GitHub](https://github.com/testpattern/ecoExample.git). 

# Run
* Copy the separately supplied `config.json` file into the root of the application (next to `app.js`).
* From the command line, run: `npm install`, then: `npm start`

# Test
From the command line, run: `npm test`.