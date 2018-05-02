const { Pool, Client } = require("pg");
const pgConfig = require("../config/secret/keys");

const pool = new Pool(pgConfig);

const client = new Client(pgConfig);

module.exports = {pool, client};