import PromptSync from "prompt-sync"

const prompt = PromptSync();

export class Tela_AgendamentoConsulta{
    static inputCpf(){
        return prompt("CPF: ")
    }

    static inputData(){
        return prompt("Data da consulta: ")
    }

    static inputHoraIni(){
        return prompt("Hora inicial: ")
    }

    static inputHoraFim(){
        return prompt("Hora final: ")
    }

    static confirmarAgendamento(){
        return console.log("Agendamento realizado com sucesso!")
    }
}