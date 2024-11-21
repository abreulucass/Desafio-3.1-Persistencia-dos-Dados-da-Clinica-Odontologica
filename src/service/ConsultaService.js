import { Consulta } from "../models/Consulta.js";
import { DateTime } from "luxon";

/**
 * Serviço responsável por operações relacionadas a consultas no consultório.
 */
export class ConsultaService {

    /**
     * Verifica se a hora de início e a hora de fim da consulta estão dentro do horário permitido (08:00 a 19:00).
     * 
     * @param {string} horaIni - A hora de início da consulta no formato "HHmm".
     * @param {string} horaFim - A hora de término da consulta no formato "HHmm".
     * @returns {boolean} Retorna `true` se o horário estiver dentro do permitido, caso contrário retorna `false`.
     */
    static horaDentroDoHorario(horaIni, horaFim) {
        const horaInicio = DateTime.fromFormat(horaIni, "HHmm");
        const horaFinal = DateTime.fromFormat(horaFim, "HHmm");
        const abertura = DateTime.fromFormat("0800", "HHmm");
        const fechamento = DateTime.fromFormat("1900", "HHmm");

        return horaInicio >= abertura && horaFinal <= fechamento;
    }

    /**
     * Cria uma nova consulta para um paciente com a data e horário especificados.
     * 
     * @param {Paciente} paciente - O paciente para o qual a consulta está sendo agendada.
     * @param {string} dataConsulta - A data da consulta no formato "dd/MM/yyyy".
     * @param {string} horaIni - A hora de início da consulta no formato "HHmm".
     * @param {string} horaFim - A hora de término da consulta no formato "HHmm".
     * @returns {Consulta} Retorna uma nova instância de `Consulta` com os dados fornecidos.
     */
    static agendarConsulta(paciente, dataConsulta, horaIni, horaFim) {
        const consulta = new Consulta(paciente, dataConsulta, horaIni, horaFim);

        return consulta;
    }
}
