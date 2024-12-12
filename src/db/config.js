import  dotenv  from "dotenv";
dotenv.config();

/**
 * Configuração do banco de dados.
 * Define as informações necessárias para a conexão com o banco de dados PostgreSQL.
 */
const dbconfig = {
    database: "consultorio",
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: "localhost",
    dialect: "postgres"
}

export default dbconfig;