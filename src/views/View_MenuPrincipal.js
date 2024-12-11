import PromptSync from "prompt-sync"

const prompt = PromptSync();

export class View_MenuPricipal{

    static init(){
        console.clear();
        console.log("\tMenu Princinpal\n");
        console.log("(1) - Cadastro de Pacientes");
        console.log("(2) - Agenda");
        console.log("(3) - Fim\n");
        
        return prompt("Digite a opção desejada: ");
    }

    

    
}

