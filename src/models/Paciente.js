import { Model } from "sequelize";
import { Result } from "../helpers/result.js";
/**
 * Representa um paciente no consultório.
 * @class Paciente
 */
export class Paciente extends Model{
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

        // ATENÇÃO!
        // Objetos mapeados para o BD NÃO podem ser criados com new
        // Deve ser usado o método estático "build"
        return errors.length == 0
            ? Result.success(Paciente.build({ cpf, nome, dtNascimento, idade }))
            : Result.failure(errors);
    }
}
