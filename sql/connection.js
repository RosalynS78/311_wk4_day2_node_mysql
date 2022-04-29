const mysql = require("mysql");
const mysql2 = require ("mysql2");
//import dotenv file
require("dotenv").config();

//store in a variable to use multiple times if needed
// const host = process.env.HOST;
// const user = process.env.USER;
// const password = process.env.PASSWORD;
// const database = process.env.DATABASE;

//Create a connection
class Connection {
  constructor() {
    if (!this.pool) {
      console.log("creating connection...");
      this.pool = mysql2.createPool({
        connectionLimit: 100,

        //see how were using the variables stored above to now secure our credentials
        host: process.env.HOST,
        user: process.env.USER,
        password:  process.env.PASSWORD,
        database: process.env.DATABASE,
        //The important part of this code is understanding how we use env variables. don't worry about the other code so much.
      });

      
      return this.pool;
    }

    return this.pool;
  }
}

const instance = new Connection();

module.exports = instance;
