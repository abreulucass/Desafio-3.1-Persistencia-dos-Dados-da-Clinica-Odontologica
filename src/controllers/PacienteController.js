
import { Paciente } from "../models/Paciente.js";
import repositoryPaciente from "../models/repository/repositoryPaciente.js";
import { Result } from "../helpers/result.js";
import consultaController from "./ConsultaController.js";

/**
* Controlador responsável pelo gerenciamento de pacientes no sistema.
* Contém métodos para cadastrar, listar e remover pacientes.
*/

export class PacienteController{

     /**
     * Verifica se um paciente existe no sistema.
     * @param {string} cpf - O CPF do paciente a ser verificado.
     * @returns {Promise<Object|null>} - Retorna o objeto do paciente se existir, ou null caso contrário.
     */
    async isPacienteExiste(cpf){
        return await repositoryPaciente.buscaPorCpf(cpf);
    }

    /**
     * Cadastra um novo paciente no sistema.
     * @param {Object} form - Objeto contendo os dados do paciente (CPF, Nome, DataNascimento, Idade).
     * @returns {Promise<Result>} - Retorna um objeto de resultado (sucesso ou falha).
     */
    async cadastrarPaciente(form){
        const result = Paciente.objFactory(form.CPF, form.Nome, form.DataNascimento, form.Idade);
        
        if (result.isSuccess){
            const paciente = result.value;
            await repositoryPaciente.salva(paciente)
            return result;
        } else {
            return result;
        }
    }

    /**
     * Consulta e lista todos os pacientes ordenados por CPF.
     * @returns {Promise<Array<Object>|null>} - Retorna uma lista de pacientes ou null se não houver pacientes.
     */
    async consultarPacientes_ordCpf(){
        let listaPaciente = await repositoryPaciente.buscaOrdemCpf();

        if(listaPaciente.length === 0){
            return null;
        }

        listaPaciente = listaPaciente.map(paciente => paciente.dataValues)

        return listaPaciente;
    }

    /**
     * Consulta e lista todos os pacientes ordenados por Nome.
     * @returns {Promise<Array<Object>|null>} - Retorna uma lista de pacientes ou null se não houver pacientes.
     */
    async consultarPacientes_ordNome(){
        let listaPaciente = await repositoryPaciente.buscaOrdemNome();

        if(listaPaciente.length === 0){
            return null;
        }

        listaPaciente = listaPaciente.map(paciente => paciente.dataValues)

        return listaPaciente;
    }

    /**
     * Remove um paciente do sistema caso ele não possua agendamentos pendentes.
     * @param {string} cpf - O CPF do paciente a ser removido.
     * @returns {Promise<Result>} - Retorna um objeto de resultado (sucesso ou falha).
     */
    async removerPaciente(cpf){
        if(!await consultaController.isPacientePossuiAgendamentoPendente(cpf)){

            const paciente = await repositoryPaciente.buscaPorCpfComConsultas(cpf)
            await repositoryPaciente.remove(paciente)
            
            return Result.success(true)
        } else {
            return Result.failure(false)
        }
        
    }
}

const pacienteController = new PacienteController();

export default pacienteController;