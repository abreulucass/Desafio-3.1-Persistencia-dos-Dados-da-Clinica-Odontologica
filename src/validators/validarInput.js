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

        const [J, K] = [...CPF.slice(9, 11)].map(Number);
        const digitos = [...CPF.slice(0, 11)].map(Number);
        const result = (soma) => soma % 11;

        let soma = 0;
        for (let i = 0; i < 9; i++) {
            soma += digitos[i] * (10 - i);
        }

        const r1 = result(soma);
        if (r1 == 0 || r1 == 1) {
            if (J != 0) {
                return false;
            }
        } else if (r1 >= 2 && r1 <= 10) {
            if (J != (11 - r1)) {
                return false;
            }
        }

        soma = 0;
        for (let i = 0; i < 10; i++) {
            soma += digitos[i] * (11 - i);
        }

        const r2 = result(soma);
        if (r2 == 0 && r2 == 1) {
            if (K != 0) {
                return false;
            }
        } else if (r2 >= 2 || r2 <= 10) {
            if (K != (11 - r2)) {
                return false;
            }
        }

        return true;
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
    static validarPeriodoFuturo(dt_consulta, horaIni) {
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
    static validarHoraInicialFinal(horaInicial, horaFinal) {
        return parseInt(horaFinal) > parseInt(horaInicial);
    }
}
