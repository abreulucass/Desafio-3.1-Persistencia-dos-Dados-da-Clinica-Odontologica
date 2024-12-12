import { View_MenuPricipal } from "./View_MenuPrincipal.js";
import { View_MenuCadastro } from "./CadastroViews/View_MenuCadastro.js";
import { View_MenuAgendamento } from "./AgendamentoViews/View_MenuAgendamento.js";
import { View_CadastroPaciente } from "./CadastroViews/View_CadastroPaciente.js";
import { View_RemoverPaciente } from "./CadastroViews/View_RemoverPaciente.js";
import { View_MostrarPaciente } from "./CadastroViews/View_MostrarPaciente.js";
import { View_AgendarConsulta } from "./AgendamentoViews/View_AgendarConsulta.js";
import { View_CancelarConsulta } from "./AgendamentoViews/View_CancelarConsulta.js";
import { View_MostrarAgendamentos } from "./AgendamentoViews/View_MostrarAgendamentos.js";

/**
 * Função principal que controla o fluxo do sistema.
 * O menu principal permite navegar entre o cadastro de pacientes, agendamento de consultas e o encerramento do sistema.
 */
class View_Controller{
     /**
     * Método que inicializa o controlador de views e executa o fluxo principal de navegação do sistema.
     */
    async init(){
        while(1) {
            // Exibe o menu principal e espera a escolha do usuário
            switch(View_MenuPricipal.init()){
                /**
                 * Caso a opção escolhida seja '1', o usuário irá navegar pelo menu de cadastro de pacientes.
                 * Aqui o usuário pode cadastrar, remover e listar pacientes.
                 */
                case '1':
                    let sair = 0;
                    while(1) {
                        switch(View_MenuCadastro.init()){
                            case '1':
                                await View_CadastroPaciente.init();
                                break;
                            case '2':
                                await View_RemoverPaciente.init();
                                break;
                            case '3':
                                await View_MostrarPaciente.init_ordemCPF();
                                break;
                            case '4':
                                await View_MostrarPaciente.init_ordemNome();
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
                        switch(View_MenuAgendamento.init()){
                            case '1':
                                await View_AgendarConsulta.init();
                                break;
                            case '2':
                                await View_CancelarConsulta.init();
                                break;
                            case '3':
                                await View_MostrarAgendamentos.init();
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
    }
}

const views_controller = new View_Controller;

export default views_controller;
