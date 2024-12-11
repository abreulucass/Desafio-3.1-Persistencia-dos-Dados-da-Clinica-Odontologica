import PromptSync from "prompt-sync"
import { ValidarInput } from "../../validators/ValidarInput.js";
import pacienteController from "../../controllers/PacienteController.js";
import consultaController from "../../controllers/ConsultaController.js";
import { utils } from "../../helpers/utils.js";


const prompt = PromptSync();

export class View_AgendarConsulta{
    static async init(){
        console.clear()
        const formAgenda = {CPF: '', DataConsulta: '', horaIni: '', horaFim: ''};
        while(1){
            const inputCPF = prompt("CPF: ");

            if(!ValidarInput.CPF(inputCPF)){
                console.log("\nERRO: CPF inválido\n")
                continue;
            }

            if(await pacienteController.isPacienteExiste(inputCPF) === null){
                console.log("\nERRO: paciente não cadastrado\n")
                return prompt();
            }

            if(await consultaController.isPacientePossuiAgendamentoPendente(inputCPF)){
                console.log("\nERRO: este paciente possui um agendamento pendente\n")
                return prompt();
            }

            formAgenda.CPF = inputCPF;
            break;
        }

        while(1){
            let inputDataConsulta = prompt("Data da Consulta: ")

            if(!ValidarInput.estruturaData(inputDataConsulta)){
                console.log("\nERRO: Data invalida.\n")
                continue;
            }

            inputDataConsulta = utils.formatarData(inputDataConsulta);

            if(!inputDataConsulta){
                console.log("\nERRO: Data invalida.\n")
                continue;
            }
            
            let inputHoraIni = prompt("Hora Inicio: ");

            if(!ValidarInput.validarHora(inputHoraIni)){
                console.log("\nERRO: Hora invalida.\n");
                continue;
            }


            if(!ValidarInput.isPeriodoFuturo(inputDataConsulta.toLocaleString(), inputHoraIni)){
                console.log("\nERRO: A data nao corresponde a um periodo futuro.\n");
                continue;
            }

            let inputHoraFim = prompt("Hora final: ");

            if(!ValidarInput.validarHora(inputHoraFim)){
                console.log("\nERRO: Hora invalida.\n");
                continue;
            }

            if(!ValidarInput.isHoraInicialAnteriorAFinal(inputHoraIni, inputHoraFim)){
                console.log("\nERRO: Hora inicial deve ser anterior a hora final.\n");
                continue;
            }

            formAgenda.DataConsulta = inputDataConsulta.toISODate();
            formAgenda.horaIni = utils.formatarHoraHHMMparaTIME(inputHoraIni);
            formAgenda.horaFim = utils.formatarHoraHHMMparaTIME(inputHoraFim);
            break;
        }

        const result = await consultaController.agendarConsulta(formAgenda);

        if(result.isSuccess){
            console.log("\nAgendamento realizado com sucesso!\n")
        } else if (result.errors === -2){
            console.log("\nERRO: já existe uma consulta agendada nesse horário\n")
        } else {
            console.log("\nERRO: erro ao agendar consulta\n")
        }

        return prompt()

    }
}