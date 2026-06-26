import pg from "pg";

const isProduction = process.env.NODE_ENV === "production";
const db = new pg.Pool(
    isProduction  
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl : { rejectUnauthorized : false }
    } 
    : {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT
    }
);

export default db;