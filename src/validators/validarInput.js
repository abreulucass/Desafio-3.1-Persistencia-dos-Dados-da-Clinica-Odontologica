import { DateTime } from "luxon";

const regexNum = /\d+/; // Expressão regular para identificar dígitos.
const regexSim = /[^\w\s]/; // Expressão regular para identificar símbolos.
const regexLetras = /[a-zA-Z]/; // Expressão regular para identificar letras.
const regexHora = /^(?:[01]\d|2[0-3])[0-5][0-9]$/; // Expressão regular para validar o formato HHMM.

/**
 * Classe responsável por validar entradas de dados como CPF, nome, data e hora.
 */
export class ValidarInput {
  
    /**
     * Valida o CPF informado.
     * 
     * @param {string} CPF - O CPF a ser validado.
     * @returns {boolean} Retorna `true` se o CPF for válido, caso contrário, retorna `false`.
     */
    static CPF(CPF) {
        if (regexLetras.test(CPF) || regexSim.test(CPF) || CPF.length < 11 || CPF.length > 11) {
            return false;
        }

        if (CPF.length !== 11 || /^(\d)\1{10}$/.test(CPF)) {
            return false;
        }
    
        const calcularDigito = (base, pesoInicial) => {
            const soma = base.split('').reduce((acc, num, index) => acc + num * (pesoInicial - index), 0);
            const resto = soma % 11;
            return resto < 2 ? 0 : 11 - resto;
        };
    
        const base = CPF.slice(0, 9);
        const digito1 = calcularDigito(base, 10);
        const digito2 = calcularDigito(base + digito1, 11);
    
        return CPF.endsWith(`${digito1}${digito2}`);

    }

    /**
     * Valida o nome informado.
     * 
     * @param {string} nome - O nome a ser validado.
     * @returns {boolean} Retorna `true` se o nome for válido, caso contrário, retorna `false`.
     */
    static nome(nome) {
        if (regexSim.test(nome) || regexNum.test(nome) || nome.length < 5) {
            return false;
        }

        return true;
    }

    /**
     * Valida a estrutura de uma data no formato "dd/MM/yyyy".
     * 
     * @param {string} data - A data a ser validada no formato "dd/MM/yyyy".
     * @returns {boolean} Retorna `true` se a data for válida, caso contrário, retorna `false`.
     */
    static estruturaData(data) {
        return DateTime.fromFormat(data, "dd/MM/yyyy").isValid;
    }

    /**
     * Valida se o agendamento de uma consulta está no futuro.
     * 
     * @param {string} dt_consulta - A data da consulta no formato "dd/MM/yyyy".
     * @param {string} horaIni - A hora de início da consulta no formato "HHmm".
     * @returns {boolean} Retorna `true` se o agendamento for no futuro, caso contrário, retorna `false`.
     */
    static isPeriodoFuturo(dt_consulta, horaIni) {
        const agora = DateTime.now();
        const dataHoraConsulta = DateTime.fromFormat(`${dt_consulta} ${horaIni}`, "dd/MM/yyyy HHmm");

        return dataHoraConsulta > agora;
    }

    /**
     * Valida se a hora fornecida está no formato correto (HHMM) e se é um múltiplo de 15 minutos.
     * 
     * @param {string} hora - A hora a ser validada no formato "HHMM".
     * @returns {boolean} Retorna `true` se a hora for válida, caso contrário, retorna `false`.
     */
    static validarHora(hora) {
        if (!regexHora.test(hora))
            return false;

        if(hora.slice(0, 2) < 8 || hora.slice(0, 2) > 19){
            return false;
        }

        const minutos = parseInt(hora.slice(2), 10);
        return minutos % 15 === 0;
    }

    /**
     * Valida se a hora de início é anterior à hora de término.
     * 
     * @param {string} horaInicial - A hora de início no formato "HHmm".
     * @param {string} horaFinal - A hora de término no formato "HHmm".
     * @returns {boolean} Retorna `true` se a hora inicial for anterior à hora final, caso contrário, retorna `false`.
     */
    static isHoraInicialAnteriorAFinal(horaInicial, horaFinal) {
        return parseInt(horaFinal) > parseInt(horaInicial);
    }
}
