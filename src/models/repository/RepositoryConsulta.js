import { Consulta } from "../Consulta.js";
import { Op } from "sequelize";

/**
 * Repositório responsável pelo gerenciamento de consultas no banco de dados.
 * Contém métodos para salvar, remover, buscar e listar consultas.
 */
class RepositoryConsulta{
    
    /**
     * Salva uma consulta no banco de dados.
     * @param {Object} consulta - O objeto de consulta a ser salvo.
     * @returns {Promise<void>} - Não retorna valor, mas salva a consulta no banco.
     */
    async salva(consulta){
        if(consulta != null) { await consulta.save(); }
    }

    /**
     * Remove uma consulta do banco de dados.
     * @param {Object} consulta - O objeto de consulta a ser removido.
     * @returns {Promise<void>} - Não retorna valor, mas remove a consulta do banco.
     */
    async remove(consulta){
        if(consulta != null) { await consulta.destroy(); }
    }

    /**
    * Busca todas as consultas associadas a um CPF.
    * @param {string} cpf - O CPF do paciente.
    * @returns {Promise<Array<Object>>} - Retorna uma lista de consultas associadas ao CPF.
    */
    async buscarConsultasPorCPF(cpf){
        return await Consulta.findAll({ 
            where: { 
            cpf: cpf},
            order: [['dtConsulta', 'ASC']] });
    }

    /**
     * Busca todas as consultas para uma determinada data.
     * @param {string} dt - A data no formato 'YYYY-MM-DD'.
     * @returns {Promise<Array<Object>>} - Retorna uma lista de consultas para a data especificada.
     */
    async buscarConsultasPorData(dt){
        return await Consulta.findAll({ 
            where: { 
            dtConsulta: dt}
            })
    }

    /**
     * Busca uma consulta específica pelo CPF, data e hora de início.
     * @param {string} cpf - O CPF do paciente.
     * @param {string} dtConsulta - A data da consulta no formato 'YYYY-MM-DD'.
     * @param {string} horaInicio - O horário de início da consulta no formato 'HH:MM:SS'.
     * @returns {Promise<Object|null>} - Retorna o objeto da consulta encontrada ou null se não existir.
     */
    async buscarConsultaPorCpfEData(cpf, dtConsulta, horaInicio){
        return await Consulta.findOne({
            where: { cpf, dtConsulta, horaInicio }
        });
    }

    /**
     * Busca todas as consultas do banco de dados.
     * @returns {Promise<Array<Object>>} - Retorna uma lista de todas as consultas.
     */
    async buscarTodas(){
        return await Consulta.findAll({
            order: [
                ['dtConsulta', 'ASC'],  
                ['horaInicio', 'ASC']  
            ],
            include: "paciente" });
    }

    /**
     * Busca todas as consultas dentro de um intervalo de datas.
     * @param {string} ini - Data inicial no formato 'YYYY-MM-DD'.
     * @param {string} fim - Data final no formato 'YYYY-MM-DD'.
     * @returns {Promise<Array<Object>>} - Retorna uma lista de consultas dentro do intervalo.
     */
    async buscarPorPeriodo(ini, fim){
        return await Consulta.findAll({ 
            order: [
                ["dtConsulta", "ASC"],
                ['horaInicio', 'ASC']
            ], 
            include: "paciente", 
            where:{
                dtConsulta:{
                    [Op.between]: [ini, fim]
                }
        } })
    }

}

const repositoryConsulta = new RepositoryConsulta();

export default repositoryConsulta;