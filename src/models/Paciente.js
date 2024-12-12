import { Model } from "sequelize";
import { Result } from "../helpers/result.js";

/**
 * Representa um paciente no consultório.
 * A classe `Paciente` herda de `Model` do Sequelize, o que permite que ela interaja diretamente com o banco de dados.
 * Esta classe contém um método estático `objFactory` que cria uma instância de `Paciente` após validar os dados fornecidos.
 * 
 * @class Paciente
 */
export class Paciente extends Model{

    /**
     * Método estático que cria uma instância de `Paciente` após validar os dados fornecidos.
     * Verifica se os dados passados estão completos e corretos, retornando um objeto de resultado com o status da operação.
     * 
     * @param {string} cpf - O CPF do paciente. Deve ter exatamente 11 caracteres.
     * @param {string} nome - O nome do paciente. Deve ter pelo menos 4 caracteres.
     * @param {string} dtNascimento - A data de nascimento do paciente. Não pode ser nula.
     * @param {number} idade - A idade do paciente. Deve ser maior ou igual a 13 anos.
     * @returns {Result} - Retorna um objeto `Result` que contém o status da operação.
     *                     Se os dados forem válidos, retorna um sucesso com o paciente criado. 
     *                     Caso contrário, retorna uma falha com os erros encontrados.
     */
    static objFactory(cpf, nome, dtNascimento, idade) {
        const errors = [];

        if (cpf === null || cpf.length !== 11)
            errors.push(-1);

        if (nome === null || nome.length < 4)
            errors.push(-2);

        if(dtNascimento === null)
            errors.push(-3);

        if (idade === null || idade < 13)
            errors.push(-4);

        return errors.length == 0
            ? Result.success(Paciente.build({ cpf, nome, dtNascimento, idade }))
            : Result.failure(errors);
    }
}
