import { ValidarInput } from "../../validators/ValidarInput.js";
import pacienteController from "../../controllers/PacienteController.js";
import PromptSync from "prompt-sync"

const prompt = PromptSync()

export class View_RemoverPaciente{

    static async init(){
        console.clear()
        const CPF = prompt("CPF: ")

        if(!ValidarInput.CPF(CPF)){
            prompt("\nERRO: CPF inválido\n")
            return false;
        }

        if(await pacienteController.isPacienteExiste(CPF) === null){
            prompt("\nERRO: paciente não cadastrado\n")
            return false;
        }

        const result = await pacienteController.removerPaciente(CPF);

        if(result.isSuccess){
            prompt("\nPaciente removido com sucesso!\n")
        } else {
            prompt("ERRO: paciente está agendado.")
        }
        
    }
}