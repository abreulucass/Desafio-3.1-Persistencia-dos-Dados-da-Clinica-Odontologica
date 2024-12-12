import { Paciente } from "../Paciente.js";

/**
 * Repositório responsável pelo gerenciamento de pacientes no banco de dados.
 * Contém métodos para salvar, remover, buscar e listar pacientes.
 */
class RepositoryPaciente{
    
    /**
     * Salva um paciente no banco de dados.
     * @param {Object} paciente - O objeto de paciente a ser salvo.
     * @returns {Promise<void>} - Não retorna valor, mas salva o paciente no banco.
     */
    async salva(paciente){
        if(paciente != null) { await paciente.save(); }
    }

    /**
     * Remove um paciente do banco de dados.
     * @param {Object} paciente - O objeto de paciente a ser removido.
     * @returns {Promise<void>} - Não retorna valor, mas remove o paciente do banco.
     */
    async remove(paciente){
        if(paciente != null) { await paciente.destroy(); }
    }

    /**
     * Busca um paciente pelo CPF.
     * @param {string} cpf - O CPF do paciente.
     * @returns {Promise<Object|null>} - Retorna o objeto do paciente encontrado ou null se não for encontrado.
     */
    async buscaPorCpf(cpf){
        return await Paciente.findByPk(cpf);
    }

    /**
     * Busca um paciente pelo CPF e inclui as consultas relacionadas.
     * @param {string} cpf - O CPF do paciente.
     * @returns {Promise<Object|null>} - Retorna o objeto do paciente encontrado, incluindo suas consultas, ou null se não for encontrado.
     */
    async buscaPorCpfComConsultas(cpf){
        return await Paciente.findOne({
            where: { cpf }, // Busca pelo CPF
            include: 'consultas' // Inclui as consultas relacionadas
        });
    }

    /**
     * Busca todos os pacientes no banco de dados, incluindo suas consultas.
     * @returns {Promise<Array<Object>>} - Retorna uma lista de todos os pacientes, cada um com suas consultas relacionadas.
     */
    async buscaTodos(){
        return await Paciente.findAll({ include: "consultas" });
    }

    /**
     * Busca todos os pacientes ordenados por CPF.
     * @returns {Promise<Array<Object>>} - Retorna uma lista de todos os pacientes, ordenados por CPF.
     */
    async buscaOrdemCpf(){
        return await Paciente.findAll({ order: [["cpf", "ASC"]], include: "consultas" })
    }

    /**
     * Busca todos os pacientes ordenados por nome.
     * @returns {Promise<Array<Object>>} - Retorna uma lista de todos os pacientes, ordenados por nome.
     */
    async buscaOrdemNome(){
        return await Paciente.findAll({ order: [["nome", "ASC"]], include: "consultas" });
    }
}

const repositoryPaciente = new RepositoryPaciente();

export default repositoryPaciente;