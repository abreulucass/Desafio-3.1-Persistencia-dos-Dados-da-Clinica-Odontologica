import { Model } from "sequelize";
import { Result } from "../helpers/result.js";
/**
 * Representa uma consulta agendada para um paciente.
 * @class Consulta
 */

export class Consulta extends Model {

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