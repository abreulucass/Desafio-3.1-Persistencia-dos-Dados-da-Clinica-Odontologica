/**
 * Representa uma consulta agendada para um paciente.
 * @class Consulta
 */

export class Consulta{

    // Atributos
    #paciente;
    #dataConsulta;
    #horaInicio;
    #horaFim;

     /**
     * Cria uma nova instância de consulta.
     * 
     * @param {Object} paciente - O paciente que está agendando a consulta.
     * @param {string} dataConsulta - A data da consulta no formato "dd/MM/yyyy".
     * @param {string} horaInicio - A hora de início da consulta no formato "HH:mm".
     * @param {string} horaFim - A hora de término da consulta no formato "HH:mm".
     */

    constructor(paciente, dataConsulta, horaInicio, horaFim){
        this.#paciente = paciente;
        this.#dataConsulta = dataConsulta;
        this.#horaInicio = horaInicio;
        this.#horaFim = horaFim;

    }

    // Gets
    /**
     * Obtém o paciente associado à consulta.
     * 
     * @returns {Object} Retorna o paciente da consulta.
     */
    get getPaciente(){ return this.#paciente; }

     /**
     * Obtém a data da consulta.
     * 
     * @returns {string} Retorna a data da consulta no formato "dd/MM/yyyy".
     */
    get getDataConsulta(){ return this.#dataConsulta; }

    /**
     * Obtém a hora de início da consulta.
     * 
     * @returns {string} Retorna a hora de início no formato "HH:mm".
     */
    get getHoraInicio(){ return this.#horaInicio; }

     /**
     * Obtém a hora de fim da consulta.
     * 
     * @returns {string} Retorna a hora de término no formato "HH:mm".
     */
    get getHoraFim(){ return this.#horaFim; }

}