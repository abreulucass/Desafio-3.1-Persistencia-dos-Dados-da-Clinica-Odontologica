import { Tela_CadastroPaciente } from "./Tela_CadastroPaciente.js";

export class Tela_RemoverPaciente extends Tela_CadastroPaciente{

    static PacienteNaoEncontrado(){
        console.log("Paciente não cadastrado")
    }

    static PacienteRemovido(){
        console.log("Paciente excluído com sucesso!")
    }

    static PacienteAgendado(){
        console.log("Paciente está agendado.")
    }
}