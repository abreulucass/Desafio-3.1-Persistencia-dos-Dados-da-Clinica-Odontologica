/**
 * @file index.js
 * @description Sistema de gerenciamento de pacientes e agendamentos de consultas para um consultório odontologico. 
 * O sistema oferece um menu interativo para o cadastro, remoção e listagem de pacientes, além de agendar e cancelar consultas.
 */

// Importações das dependências
import PromptSync from "prompt-sync"
import { Tela_Menu } from "./views/Tela_Menu.js";
import { Tela_CadastroPaciente } from "./views/Tela_CadastroPaciente.js";
import { Consultorio } from "./models/Consultorio.js";
import { PacienteController } from "./controllers/PacienteController.js";
import { Tela_RemoverPaciente } from "./views/Tela_RemoverPaciente.js";
import { Tela_MostrarPaciente } from "./views/Tela_MostrarPaciente.js";
import { Tela_MostrarAgendamento } from "./views/Tela_MostrarAgendamento.js";
import { ConsultaController } from "./controllers/ConsultaController.js";
import { Paciente } from "./models/Paciente.js";
import { DateTime } from "luxon";
import { Tela_AgendamentoConsulta } from "./views/Tela_AgendamentoConsulta.js";
import { Tela_CancelarAgendamento } from "./views/Tela_CancelarAgendamento.js";

// Inicializa o prompt para leitura do terminal e o consultório
const prompt = PromptSync();
const consultorio = new Consultorio();

/**
 * Função principal que controla o fluxo do sistema.
 * O menu principal permite navegar entre o cadastro de pacientes, agendamento de consultas e o encerramento do sistema.
 */
while(1) {
    // Exibe o menu principal e espera a escolha do usuário
    switch(Tela_Menu.menuPrincipal()) {
        /**
         * Caso a opção escolhida seja '1', o usuário irá navegar pelo menu de cadastro de pacientes.
         * Aqui o usuário pode cadastrar, remover e listar pacientes.
         */
        case '1':
            let sair = 0;
            while(1) {
                // Exibe o menu de cadastro de pacientes
                switch(Tela_Menu.menuCadastro()) {
                    case '1':
                        const resCadastrar = PacienteController.cadastrarPaciente(consultorio);
                        if (resCadastrar === 1) {
                            Tela_CadastroPaciente.confirmaCadastro();
                        }
                        prompt();
                        break;
                    case '2':
                        const resRemover = PacienteController.removerPaciente(consultorio);
                        if (resRemover === 1) {
                            Tela_RemoverPaciente.PacienteRemovido();
                        }
                        prompt();
                        break;
                    case '3':
                        const ordemCPF = PacienteController.mostrarPaciente_ordCPF(consultorio);
                        Tela_MostrarPaciente.body(ordemCPF, consultorio	);
                        prompt();
                        break;
                    case '4':
                        const ordemNome = PacienteController.mostrarPaciente_ordNome(consultorio);
                        Tela_MostrarPaciente.body(ordemNome, consultorio);
                        prompt();
                        break;
                    case '5':
                        sair = 1;
                        break;
                    default:
                        console.log("Opção inválida.");
                        break;
                }

                if (sair === 1) break;
            }
            break;

        /**
         * Caso a opção escolhida seja '2', o usuário irá navegar pelo menu de agendamento de consultas.
         * Aqui o usuário pode agendar, cancelar e listar agendamentos.
         */
        case '2':
            while(1) {
                let sair = 0;
                switch(Tela_Menu.menuAgenda()) {
                    case '1':
                        const resConsulta = ConsultaController.cadastrarConsulta(consultorio);
                        if (resConsulta === 1) {
                            Tela_AgendamentoConsulta.confirmarAgendamento();
                        }
                        prompt();
                        break;
                    case '2':
                        const resCancel = ConsultaController.cancelarAgendamento(consultorio);
                        if (resCancel === 1) {
                            Tela_CancelarAgendamento.confirmarCancelamento();
                        }
                        prompt();
                        break;
                    case '3':
                        const [agendamentos, dataIni, dataFim] = ConsultaController.listarAgendamento(consultorio);
                        Tela_MostrarAgendamento.body(agendamentos, dataIni, dataFim);
                        prompt();
                        break;
                    case '4':
                        sair = 1;
                        break;
                    default:
                        console.log("Opção inválida.");
                        break;
                }

                if (sair === 1) break;
            }
            break;

        /**
         * Caso a opção escolhida seja '3', o sistema será encerrado.
         */
        case '3':
            process.exit();
            break;

        /**
         * Caso o usuário escolha uma opção inválida.
         */
        default:
            console.log("Opção inválida.");
            break;
    }
}
