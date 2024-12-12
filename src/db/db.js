import { Sequelize } from "sequelize";
import { Paciente } from "../models/Paciente.js";
import { Consulta } from "../models/Consulta.js";
import dbconfig from "./config.js";
import createModelConsulta from "./schema/consulta.js";
import createModelPaciente from "./schema/paciente.js";

/**
 * Classe responsável pela conexão e inicialização do banco de dados.
 * Configura o Sequelize, define os modelos e estabelece as relações entre as tabelas.
 */
class Db{

    #sequelize;

    /**
     * Inicializa a conexão com o banco de dados e configura os modelos e as associações.
     * @returns {Promise<boolean>} - Retorna true se a conexão e a sincronização forem bem-sucedidas, false em caso de erro.
     */
    async init(){
        this.#sequelize = new Sequelize(
            dbconfig.database,
            dbconfig.username,
            dbconfig.password,
            {
                host: dbconfig.host,
                dialect: dbconfig.dialect,
                logging: false,
            }
        );

        try{
            await this.#sequelize.authenticate();
        } catch (error){
            return false;
        }

        createModelPaciente(Paciente, this.#sequelize, Sequelize.DataTypes);
        createModelConsulta(Consulta, this.#sequelize, Sequelize.DataTypes);

        Paciente.hasMany(Consulta, {foreignKey: 'cpf', as: 'consultas'});
        Consulta.belongsTo(Paciente, { foreignKey: 'cpf', as: 'paciente'});

        await this.#sequelize.sync({ force: false }) // Força a sincronização sem apagar os dados
        .then(() => {
            console.log('Tabelas sincronizadas!');
        })
        .catch(error => console.error('Erro ao sincronizar tabelas:', error));

        return true;
    }

    get sequelize(){
        return this.#sequelize;
    }
}

const db = new Db()

export default db;
