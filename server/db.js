// // Parse the connection string
const { Pool } = require('pg');

// Connection string from the provided link
const connectionString = "postgresql://postgres:b-6CaeFfCcDd-*1-g1Eg-fffc2DCea-*@roundhouse.proxy.rlwy.net:17486/railway";

const { user, password, host, port, database } = require('pg-connection-string').parse(connectionString);

// Create a new Pool
const pool = new Pool({
  user,
  password,
  host,
  port,
  database,
});


module.exports = pool;