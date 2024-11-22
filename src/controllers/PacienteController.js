import { ValidarInput } from "../validators/validarInput.js";
import { PacienteService } from "../service/PacienteService.js";
import { Tela_CadastroPaciente } from "../views/Tela_CadastroPaciente.js";
import { Tela_RemoverPaciente } from "../views/Tela_RemoverPaciente.js";
import { Tratar } from "../views/Tratar.js";
import { utils } from "../utils/utils.js"

/**
* Controlador responsável pelo gerenciamento de pacientes no sistema.
* Contém métodos para cadastrar, listar e remover pacientes.
*/

export class PacienteController{

    /**
    * Realiza o cadastro de um novo paciente.
    * 
    * Verifica se o CPF informado é válido, se o paciente já existe no consultório, 
    * se o nome é válido, e se a data de nascimento está correta. Também calcula a idade do paciente.
    * 
    * @param {Object} consultorio - Objeto representando o consultório onde o paciente será cadastrado.
    * @returns {boolean} Retorna `true` se o paciente for cadastrado com sucesso, 
    * caso contrário retorna um código de erro.
    */

    static cadastrarPaciente(consultorio){
        console.clear()
        while(1){
            var CPF = Tela_CadastroPaciente.inputCpf();

            if(!ValidarInput.CPF(CPF)){
                Tratar.ERRO(-10);
                continue;
            }

            if(consultorio.pacienteExiste(CPF)){
                Tratar.ERRO(-11);
                continue;
            }

            break;
        }

        while(1){
            var nome = Tela_CadastroPaciente.inputNome();

            if(!ValidarInput.nome(nome)){
                Tratar.ERRO(-12);
                continue;
            }

            break;
        }

        while(1){
            var dataNascimento = Tela_CadastroPaciente.inputDataNascimento();

            if(!ValidarInput.estruturaData(dataNascimento)){
                Tratar.ERRO(-13);
                continue;
            }

            dataNascimento = utils.trasformaData(dataNascimento);

            if(!dataNascimento){
                Tratar.ERRO(-13);
                continue;
            }

            var idade = utils.calculoIdade(dataNascimento);

            break;
        }

        var paciente = PacienteService.criarPaciente([CPF, nome, dataNascimento, idade]);

        if(!paciente){
            return  Tratar.ERRO(-14);
        }

        const res = consultorio.inserirPaciente(paciente);

        return res;
    }

    /**
    * Lista os pacientes ordenados por CPF.
    * 
    * @param {Object} consultorio - Objeto representando o consultório de onde os pacientes serão listados.
    * @returns {Array} Retorna uma lista de pacientes ordenada pelo CPF.
    */

    static mostrarPaciente_ordCPF(consultorio){

        const ordem = consultorio.getPacientes.sort((a, b) => {
            if (a.getCPF < b.getCPF) {
                return -1;
             }
            if (a.getCPF > b.getCPF) {
                return 1;
            }
                return 0;
            });

        return ordem;
    }

    /**
    * Lista os pacientes ordenados por nome.
    * 
    * @param {Object} consultorio - Objeto representando o consultório de onde os pacientes serão listados.
    * @returns {Array} Retorna uma lista de pacientes ordenada pelo nome.
    */

    static mostrarPaciente_ordNome(consultorio){

        const ordem = consultorio.getPacientes.sort((a, b) => { return a.getNome.localeCompare(b.getNome); });

        return ordem;
    }

    /**
    * Remove um paciente do consultório.
    * 
    * Verifica se o CPF do paciente existe no consultório, e remove o paciente caso exista.
    * 
    * @param {Object} consultorio - Objeto representando o consultório de onde o paciente será removido.
    * @returns {boolean} Retorna `true` se o paciente for removido com sucesso, 
    * caso contrário retorna `-1` se o paciente não existir.
    */

    static removerPaciente(consultorio){
        console.clear()

        var CPF = Tela_RemoverPaciente.inputCpf();

        if(!consultorio.pacienteExiste(CPF))
            return Tratar.ERRO(-15);
        if(!consultorio.validarAgendamentoUnico(CPF))
            return Tratar.ERRO(-23)

        const index = consultorio.buscarIndexPaciente(CPF)

        consultorio.removerPaciente(index)

        return 1;
    }
}