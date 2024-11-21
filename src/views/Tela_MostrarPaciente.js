import { DateTime } from "luxon";


export class Tela_MostrarPaciente{
    
    static body(ordem, consultorio){
        console.clear()
        const now = DateTime.now;

        if(ordem[0] == null){
            console.log("\nNenhum paciente cadastrado")
            return 0;
        }
        console.log("---------------------------------------------------------------------")
        console.log("  CPF           Nome                              Dt.Nasc.     Idade ")
        console.log("---------------------------------------------------------------------")
        ordem.forEach(paciente => {
            console.log(`  ${paciente.getCPF}   ${paciente.getNome.padEnd(32)}  ${paciente.getDataNascimento.toLocaleString()}   ${paciente.getIdade.toString().padEnd(6)} `)
            if(consultorio.buscarAgendamento(paciente.getCPF)){
                const agendamento = consultorio.buscarAgendamento(paciente.getCPF)
                const dataConsulta = agendamento.getDataConsulta;
                let horaInicial = DateTime.fromFormat(agendamento.getHoraInicio, "HHmm");
                let horaFinal = DateTime.fromFormat(agendamento.getHoraFim, "HHmm");
                
                horaInicial = horaInicial.toFormat("HH:mm")
                horaFinal = horaFinal.toFormat("HH:mm")

                console.log("                Agendado para: " + dataConsulta)
                console.log(horaInicial.padStart(21), " às ", horaFinal)
            }
        })
        console.log("---------------------------------------------------------------------")
    }

   

}