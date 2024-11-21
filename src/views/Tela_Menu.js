import PromptSync from "prompt-sync"

const prompt = PromptSync();

export class Tela_Menu{

    static menuPrincipal(){
        console.clear();
        console.log("\tMenu Princinpal\n");
        console.log("(1) - Cadastro de Pacientes");
        console.log("(2) - Agenda");
        console.log("(3) - Fim\n");
        
        return prompt("Digite a opção desejada: ");
    }

    static menuCadastro(){
        console.clear()
        console.log("\tMenu do Cadastro de Pacientes");
        console.log("(1) - Cadastrar novo paciente");
        console.log("(2) - Excluir paciente");
        console.log("(3) - Listar pacientes (ordenado por CPF)");
        console.log("(4) - Listar pacientes (ordenado por nome)");
        console.log("(5) - Voltar p/ menu principal\n");
        
        return prompt("Digite a opção desejada: ");
    }

    static menuAgenda(){
        console.clear()
        console.log("\tAgenda\n")
        console.log("(1) - Agendar consulta"); 
        console.log("(2) - Cancelar Agendamento"); 
        console.log("(3) - Listar Agenda");
        console.log("(4) - Voltar p/ menu principal\n")
        
        return prompt("Digite a opção desejada: ");
    }
}

