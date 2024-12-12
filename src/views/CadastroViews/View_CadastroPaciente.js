import PromptSync from "prompt-sync"
import { ValidarInput } from "../../validators/ValidarInput.js";
import { utils } from "../../helpers/utils.js";
import pacienteController from "../../controllers/PacienteController.js";

const prompt = PromptSync();

export class View_CadastroPaciente{
    
     /**
     * Método principal que gerencia o processo de cadastro de um paciente.
     * Recebe dados do usuário, valida-os e interage com o controlador de pacientes.
     */
    static async init(){
        console.clear()
        const formCadastro = {CPF: '', Nome: '', DataNascimento: '', Idade: ''};

        while(1){
            const inputCPF = prompt("CPF: ");

            if(!ValidarInput.CPF(inputCPF)){
                console.log("\nERRO: CPF inválido\n")
                continue;
            }

            if(await pacienteController.isPacienteExiste(inputCPF) != null){
                console.log("\nERRO: Paciente já existe\n")
                continue;
            }

            formCadastro.CPF = inputCPF;
            break; 
        }

        while(1){
            const inputNome = prompt("Nome: ")

            if(!ValidarInput.nome(inputNome)){
                console.log("\nERRO: Nome inválido\n")
                continue;
            }

            formCadastro.Nome = inputNome
            break;
        }

        while(1){
            let inputDataNascimento = prompt("Data de Nascimento: ")

            if(!ValidarInput.estruturaData(inputDataNascimento)){
                console.log("\nERRO: Data invalida.\n")
                continue;
            }

            inputDataNascimento = utils.formatarData(inputDataNascimento);

            if(!inputDataNascimento){
                console.log("\nERRO: Data invalida.\n")
                continue;
            }

            const idade = utils.calculoIdade(inputDataNascimento);

            if(idade < 13){
                console.log("\nERRO: paciente deve ter pelo menos 13 anos.\n")
                continue;
            }

            formCadastro.DataNascimento = inputDataNascimento.toISODate();
            formCadastro.Idade = idade;

            break;
        }

        // Controller
        const result = await pacienteController.cadastrarPaciente(formCadastro);

        if(result.isSuccess){
            console.log("\nPaciente cadastrado com sucesso!\n")
        } else {
            console.log("\nERRO: erro ao cadastrar o paciente\n")
        }

        return prompt()
    }
}
