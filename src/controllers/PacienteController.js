
import { Paciente } from "../models/Paciente.js";
import repositoryPaciente from "../models/repository/repositoryPaciente.js";
import { Result } from "../helpers/result.js";
import consultaController from "./ConsultaController.js";

/**
* Controlador responsável pelo gerenciamento de pacientes no sistema.
* Contém métodos para cadastrar, listar e remover pacientes.
*/

export class PacienteController{

    async isPacienteExiste(cpf){
        return await repositoryPaciente.buscaPorCpf(cpf);
    }

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

    async consultarPacientes_ordCpf(){
        let listaPaciente = await repositoryPaciente.buscaOrdemCpf();

        if(listaPaciente.length === 0){
            return null;
        }

        listaPaciente = listaPaciente.map(paciente => paciente.dataValues)

        return listaPaciente;
    }

    async consultarPacientes_ordNome(){
        let listaPaciente = await repositoryPaciente.buscaOrdemNome();

        if(listaPaciente.length === 0){
            return null;
        }

        listaPaciente = listaPaciente.map(paciente => paciente.dataValues)

        return listaPaciente;
    }


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