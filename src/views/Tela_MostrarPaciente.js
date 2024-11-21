export class Tela_MostrarPaciente{
    
    static body(ordem){
        console.clear()
        if(ordem[0] == null){
            console.log("\nNenhum paciente cadastrado")
            return 0;
        }
        console.log("---------------------------------------------------------------------")
        console.log("  CPF           Nome                              Dt.Nasc.     Idade ")
        console.log("---------------------------------------------------------------------")
        ordem.forEach(paciente => {
            console.log(`  ${paciente.getCPF}   ${paciente.getNome.padEnd(32)}  ${paciente.getDataNascimento.toLocaleString()}   ${paciente.getIdade.toString().padEnd(6)} `)
        })
        console.log("---------------------------------------------------------------------")
    }

   

}