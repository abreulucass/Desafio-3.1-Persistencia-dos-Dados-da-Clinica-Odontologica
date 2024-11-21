import { Paciente } from "../models/Paciente.js";

/**
 * Serviço responsável por operações relacionadas aos pacientes.
 */
export class PacienteService {

    /**
     * Cria um novo paciente com base nos dados fornecidos, desde que a idade seja maior ou igual a 13 anos.
     * 
     * @param {Array} dadosPaciente - Um array contendo os dados do paciente: CPF, nome, data de nascimento e idade.
     * @param {string} dadosPaciente[0] - O CPF do paciente.
     * @param {string} dadosPaciente[1] - O nome do paciente.
     * @param {string} dadosPaciente[2] - A data de nascimento do paciente no formato "dd/MM/yyyy".
     * @param {number} dadosPaciente[3] - A idade do paciente.
     * @returns {Paciente|boolean} Retorna uma instância de `Paciente` se a idade for maior ou igual a 13 anos, 
     * ou `false` caso contrário.
     */
    static criarPaciente([CPF, nome, dataNascimento, idade]) {
        if (idade < 13) {
            return false;
        }

        const paciente = new Paciente(CPF, nome, dataNascimento, idade);

        return paciente;
    }
}
