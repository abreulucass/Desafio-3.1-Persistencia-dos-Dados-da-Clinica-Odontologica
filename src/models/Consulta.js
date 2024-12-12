import { Model } from "sequelize";
import { Result } from "../helpers/result.js";

/**
 * Representa uma consulta agendada para um paciente.
 * A classe `Consulta` herda de `Model` do Sequelize, o que significa que ela pode interagir diretamente com o banco de dados.
 * Esta classe contém um método estático `objFactory` que cria uma instância de `Consulta`, realizando validações antes de construí-la.
 * @class Consulta
 */

export class Consulta extends Model {

    /**
     * Método estático que cria uma instância de `Consulta` após validar os dados fornecidos.
     * Verifica se os dados passados estão completos e corretos, retornando um objeto de resultado com o status da operação.
     * 
     * @param {string} cpf - O CPF do paciente. Deve ter exatamente 11 caracteres.
     * @param {string} dtConsulta - A data da consulta, não pode ser nula.
     * @param {string} horaInicio - A hora de início da consulta, não pode ser nula.
     * @param {string} horaFim - A hora de fim da consulta, não pode ser nula.
     * @returns {Result} - Retorna um objeto `Result` que contém o status da operação.
     *                     Se os dados forem válidos, retorna um sucesso com a consulta criada. 
     *                     Caso contrário, retorna uma falha com os erros encontrados.
     */
    static objFactory(cpf, dtConsulta, horaInicio, horaFim) {
        const errors = [];

        if (cpf === null || cpf.length !== 11)
            errors.push(-1);
        if(dtConsulta === null)
            errors.push(-2);
        if(horaInicio === null)
            errors.push(-3);
        if(horaFim === null)
            errors.push(-4);

        return errors.length == 0
            ? Result.success(Consulta.build({ cpf, dtConsulta, horaInicio, horaFim }))
            : Result.failure(errors);
    }
    
}