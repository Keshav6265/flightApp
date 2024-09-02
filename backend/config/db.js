import pg from "pg";

const db = new pg.Pool({
    user: "postgres",
    host: "localhost",
    database: "flightApp",
    password: "Keshav@123",
    port: 5432,
  });

  export default db;