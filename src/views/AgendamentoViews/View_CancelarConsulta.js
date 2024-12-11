import PromptSync from "prompt-sync"
import { ValidarInput } from "../../validators/ValidarInput.js"
import pacienteController from "../../controllers/PacienteController.js"
import consultaController from "../../controllers/ConsultaController.js"
import { utils } from "../../helpers/utils.js"
const prompt = PromptSync()

export class View_CancelarConsulta{
    static async init(){
        const formCancelar = {CPF: '', dtConsulta: '', horaInicio: ''}
        const inputCPF = prompt("CPF: ")

        if(!ValidarInput.CPF(inputCPF)){
            console.log("\nERRO: CPF inválido\n")
            return prompt()
        }

        if(await pacienteController.isPacienteExiste(inputCPF) === null){
            console.log("\nERRO: paciente não cadastrado\n")
            return prompt();
        }

        let inputDataConsulta = prompt("Data da Consulta: ")

        if(!ValidarInput.estruturaData(inputDataConsulta)){
            console.log("\nERRO: Data invalida.\n")
            return prompt();
        }

        inputDataConsulta = utils.formatarData(inputDataConsulta);

        if(!inputDataConsulta){
            console.log("\nERRO: Data invalida.\n")
            return prompt();
        }
            
        let inputHoraIni = prompt("Hora Inicio: ");

        if(!ValidarInput.validarHora(inputHoraIni)){
            console.log("\nERRO: Hora invalida.\n");
            return prompt();
        }

        if(!ValidarInput.isPeriodoFuturo(inputDataConsulta.toLocaleString(), inputHoraIni)){
            console.log("\nERRO: A data nao corresponde a um periodo futuro.\n");
            return prompt();
        }

        formCancelar.CPF = inputCPF
        formCancelar.dtConsulta = inputDataConsulta.toISODate();
        formCancelar.horaInicio = utils.formatarHoraHHMMparaTIME(inputHoraIni);

        const result = await consultaController.cancelarConsulta(formCancelar);

        if(result.isSuccess){
            console.log("\nAgendamento cancelado com sucesso!\n")
        } else {
            console.log("\nERRO: agendamento não encontrado\n")
        }

        return prompt()
    }
}