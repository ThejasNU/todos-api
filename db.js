const Pool = require("pg").Pool;
require("dotenv").config();

const pool = new Pool({
	user: process.env.USERNAME,
	password: process.env.PASSWORD,
	database: "todo_database",
	host: "localhost",
	port: 5432,
});

module.exports = pool;
