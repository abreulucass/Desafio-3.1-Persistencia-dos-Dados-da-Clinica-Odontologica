import { DateTime } from "luxon";
import consultaController from "../../controllers/ConsultaController.js";
import { utils } from "../../helpers/utils.js";
import { ValidarInput } from "../../validators/ValidarInput.js";
import PromptSync from "prompt-sync"

const prompt = PromptSync();

export class View_MostrarAgendamentos{

    /**
     * Exibe a lista de agendamentos de consultas com base na escolha do usuário: 
     * - Todos os agendamentos ou 
     * - Agendamentos em um período específico.
     * 
     * O usuário é solicitado a informar se deseja exibir todos os agendamentos ou filtrar por um intervalo de datas. 
     * O sistema valida as entradas e exibe as informações de agendamentos, incluindo nome do paciente, data de nascimento e o tempo da consulta.
     * 
     * @returns {string} Retorna o prompt para o usuário após a exibição da agenda.
     */
    static async init(){
        console.clear()
        while(1){
            var res = prompt("Apresentar a agenda T-Toda ou P-Periodo: ").toUpperCase()

            if(res == 'T')
                break;
            if(res == 'P')
                break;

            console.log("ERRO: Opcao invalida")
        }  

        let agendamentos = [];

        if(res === 'T')
        {

            agendamentos = await consultaController.listarTodosAgendamento();

        } else if( res === 'P'){
            while(1){
                var periodoIni = prompt("Data Inicial: ");

                if(!ValidarInput.estruturaData(periodoIni)){
                    console.log("\nERRO: Data invalida.\n")
                    continue;
                }

                periodoIni = utils.formatarData(periodoIni);

                if(!periodoIni){
                    console.log("\nERRO: Data invalida.\n")
                    continue;
                }

                var periodoFim = prompt("Data Final: ");

                if(!ValidarInput.estruturaData(periodoFim)){
                    console.log("\nERRO: Data invalida.\n")
                    continue;
                }

                periodoFim = utils.formatarData(periodoFim);

                if(!periodoFim){
                    console.log("\nERRO: Data invalida.\n")
                    continue;
                }

                agendamentos = await consultaController.listarPeriodoAgendamento(periodoIni.toISODate(), periodoFim.toISODate());

                break;
            }
        }

        if(agendamentos === null){
            console.log("\nNao ha nenhum agendamento\n");
            return prompt();
        }

        console.log("\n--------------------------------------------------------------------");
        console.log("Data       H.Ini  H.Fim  Tempo   Nome                   Dt.Nasc.");
        console.log("------------------------------------------------------------------");

        let dataAtual = null

        agendamentos.forEach((agendamento) => {
            const dataConsulta = DateTime.fromISO(agendamento.dtConsulta).toFormat('dd/MM/yyyy');
            let horaInicial = DateTime.fromFormat(agendamento.horaInicio, 'HH:mm:ss');
            let horaFim = DateTime.fromFormat(agendamento.horaFim, 'HH:mm:ss');
            const tempoConsulta = utils.calcularTempoConsulta(horaInicial, horaFim);
            const nome = agendamento.paciente.nome.padEnd(22, " ");
            const dataNascimento = DateTime.fromISO(agendamento.paciente.dtNascimento).toFormat('dd/MM/yyyy');

            horaInicial = horaInicial.toFormat("HH:mm")
            horaFim = horaFim.toFormat("HH:mm")

            if (dataConsulta !== dataAtual) {
                console.log(dataConsulta);
                dataAtual = dataConsulta;
            }

            console.log(
                `${horaInicial.padStart(16, " ")}  ${horaFim.padStart(5, " ")}  ${tempoConsulta.padStart(
                    5,
                    " "
                )}   ${nome} ${dataNascimento}`
            );
        });

        console.log("------------------------------------------------------------------");
        
        return prompt()
    }

}