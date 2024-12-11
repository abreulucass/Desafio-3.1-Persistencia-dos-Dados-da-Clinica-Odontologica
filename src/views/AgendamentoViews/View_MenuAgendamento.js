import PromptSync from "prompt-sync";
const prompt = PromptSync();

export class View_MenuAgendamento{
    static init(){
        console.clear()
        console.log("\tAgenda\n")
        console.log("(1) - Agendar consulta"); 
        console.log("(2) - Cancelar Agendamento"); 
        console.log("(3) - Listar Agenda");
        console.log("(4) - Voltar p/ menu principal\n")
        
        return prompt("Digite a opção desejada: ");
    }
}