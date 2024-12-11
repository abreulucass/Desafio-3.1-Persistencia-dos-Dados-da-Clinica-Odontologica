import  dotenv  from "dotenv";
dotenv.config();

const dbconfig = {
    database: "consultorio",
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: "localhost",
    dialect: "postgres"
}

export default dbconfig;