import { DateTime } from "luxon";
import pacienteController from "../../controllers/PacienteController.js";
import PromptSync from "prompt-sync"

const prompt = PromptSync();

export class View_MostrarPaciente{

    /**
     * Exibe a lista de pacientes ordenados por nome.
     * Para cada paciente, exibe informações como CPF, nome, data de nascimento, idade e consultas agendadas.
     */
    static async init_ordemNome(){
        const listaPaciente = await pacienteController.consultarPacientes_ordNome();

        console.clear()


        if(listaPaciente === null){
            prompt("\nNenhum paciente cadastrado")
            return 0;
        }
        console.log("---------------------------------------------------------------------")
        console.log("  CPF           Nome                              Dt.Nasc.     Idade ")
        console.log("---------------------------------------------------------------------")
        listaPaciente.forEach(paciente => {
            console.log(`  ${paciente.cpf}   ${paciente.nome.padEnd(32)}  ${DateTime.fromISO(paciente.dtNascimento).toFormat('dd/MM/yyyy')}   ${paciente.idade.toString().padEnd(6)} `)
            if(paciente.consultas.length !== 0){
                paciente.consultas.forEach(consulta =>{
                    const dataConsulta = DateTime.fromISO(consulta.dataValues.dtConsulta).toFormat('dd/MM/yyyy');
                    const horaInicial = DateTime.fromFormat(consulta.dataValues.horaInicio, 'HH:mm:ss').toFormat('HH:mm');
                    const horaFim = DateTime.fromFormat(consulta.dataValues.horaFim, 'HH:mm:ss').toFormat('HH:mm');

                    console.log("                Agendado para: " + dataConsulta)
                    console.log(horaInicial.padStart(21), " às ", horaFim)
                })
            }
        })
        console.log("---------------------------------------------------------------------")

        return prompt()
    }

     /**
     * Exibe a lista de pacientes ordenados por CPF.
     * Para cada paciente, exibe informações como CPF, nome, data de nascimento, idade e consultas agendadas.
     */
    static async init_ordemCPF(){
        const listaPaciente = await pacienteController.consultarPacientes_ordCpf();

        console.clear()

        if(listaPaciente === null){
            prompt("\nNenhum paciente cadastrado")
            return 0;
        }
        console.log("---------------------------------------------------------------------")
        console.log("  CPF           Nome                              Dt.Nasc.     Idade ")
        console.log("---------------------------------------------------------------------")
        listaPaciente.forEach(paciente => {
            console.log(`  ${paciente.cpf}   ${paciente.nome.padEnd(32)}  ${DateTime.fromISO(paciente.dtNascimento).toFormat('dd/MM/yyyy')}   ${paciente.idade.toString().padEnd(6)} `)
            if(paciente.consultas.length !== 0){
                paciente.consultas.forEach(consulta =>{
                    const dataConsulta = DateTime.fromISO(consulta.dataValues.dtConsulta).toFormat('dd/MM/yyyy');
                    const horaInicial = DateTime.fromFormat(consulta.dataValues.horaInicio, 'HH:mm:ss').toFormat('HH:mm');
                    const horaFim = DateTime.fromFormat(consulta.dataValues.horaFim, 'HH:mm:ss').toFormat('HH:mm');

                    console.log("                Agendado para: " + dataConsulta)
                    console.log(horaInicial.padStart(21), " às ", horaFim)
                })
            }
        })
        console.log("---------------------------------------------------------------------")

        return prompt()
    }
   

}