import PromptSync from "prompt-sync"
const prompt = PromptSync();

export class View_MenuCadastro{
    
     /**
     * Método responsável por exibir o menu de cadastro de pacientes e retornar a opção escolhida pelo usuário.
     * Exibe as opções de cadastrar, excluir, listar pacientes e voltar para o menu principal.
     */
    static init(){
        console.clear()
        console.log("\tMenu do Cadastro de Pacientes");
        console.log("(1) - Cadastrar novo paciente");
        console.log("(2) - Excluir paciente");
        console.log("(3) - Listar pacientes (ordenado por CPF)");
        console.log("(4) - Listar pacientes (ordenado por nome)");
        console.log("(5) - Voltar p/ menu principal\n");
        
        return prompt("Digite a opção desejada: ");
    }
}