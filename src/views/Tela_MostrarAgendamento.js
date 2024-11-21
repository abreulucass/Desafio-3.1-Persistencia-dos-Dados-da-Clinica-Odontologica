import { utils } from "../utils/utils.js";
import { DateTime } from "luxon";
import { ValidarInput } from "../validators/validarInput.js";
import { Tratar } from "./Tratar.js";
import PromptSync from "prompt-sync"

const prompt = PromptSync();

export class Tela_MostrarAgendamento{

    static ApresentarAgenda(){
        console.clear()
        while(1){
            var res = prompt("Apresentar a agenda T-Toda ou P-Periodo: ")

            if(res == 'T')
                return 'T';
            if(res == 'P')
                break
        }

        const dataIni = prompt("Data Inicial: ")

        if(!ValidarInput.estruturaData(dataIni))
            return Tratar.ERRO(-13)

        const dataFim = prompt("Data Final: ")

        if(!ValidarInput.estruturaData(dataFim))
            return Tratar.ERRO(-13)

        return [res, dataIni, dataFim]
    }

    static body(agendamentos, dataIni, dataFim){
        if(agendamentos[0] == null){
            console.log("Nao ha nenhum agendamento");
            return 0;
        }

        if(dataIni && dataFim){
            console.log(`Data inicial: ${dataIni}`)
            console.log(`Data final: ${dataFim}`)
        }
        console.log("------------------------------------------------------------------");
        console.log("Data       H.Ini  H.Fim  Tempo   Nome                   Dt.Nasc.");
        console.log("------------------------------------------------------------------");

        let dataAtual = null;

        agendamentos.forEach((agendamento) => {
            const dataConsulta = agendamento.getDataConsulta;
            let horaInicial = DateTime.fromFormat(agendamento.getHoraInicio, "HHmm");
            let horaFinal = DateTime.fromFormat(agendamento.getHoraFim, "HHmm");
            const tempoConsulta = utils.calcularTempoConsulta(horaInicial, horaFinal);
            const nome = agendamento.getPaciente.getNome.padEnd(22, " ");
            const dataNascimento = agendamento.getPaciente.getDataNascimento;

            horaInicial = horaInicial.toFormat("HH:mm")
            horaFinal = horaFinal.toFormat("HH:mm")

            if (dataConsulta !== dataAtual) {
                console.log(dataConsulta);
                dataAtual = dataConsulta;
            }

            console.log(
                `${horaInicial.padStart(16, " ")}  ${horaFinal.padStart(5, " ")}  ${tempoConsulta.padStart(
                    5,
                    " "
                )}   ${nome} ${dataNascimento.toLocaleString()}`
            );
        });

        console.log("------------------------------------------------------------------");

    }
}