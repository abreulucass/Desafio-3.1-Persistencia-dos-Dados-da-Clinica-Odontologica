import PromptSync from "prompt-sync";
const prompt = PromptSync();

export class View_MenuAgendamento{
    
    /**
     * Exibe o menu de agendamento de consultas e coleta a escolha do usuário.
     * O menu oferece opções para agendar, cancelar ou listar agendamentos de consultas.
     * 
     * @returns {string} Retorna a opção escolhida pelo usuário no menu.
     */
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