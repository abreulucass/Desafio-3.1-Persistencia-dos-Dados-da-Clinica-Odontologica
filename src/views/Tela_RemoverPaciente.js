import { Tela_CadastroPaciente } from "./Tela_CadastroPaciente.js";

export class Tela_RemoverPaciente extends Tela_CadastroPaciente{

    static PacienteRemovido(){
        console.log("Paciente excluído com sucesso!")
    }
}