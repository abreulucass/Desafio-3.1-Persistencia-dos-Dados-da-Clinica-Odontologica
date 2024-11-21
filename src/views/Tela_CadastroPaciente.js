import PromptSync from "prompt-sync"

const prompt = PromptSync();

export class Tela_CadastroPaciente{
    static inputCpf(){
        return prompt("CPF: ")
    }

    static inputNome(){
        return prompt("Nome: ")
    }

    static inputDataNascimento(){
        return prompt("Data de Nascimento: ")
    }

    static confirmaCadastro(){
        console.log("Paciente cadastrado com sucesso!!!")
    }
}