import db from "./db/db.js";
import views_controller from "./views/Views_Controller.js";

const initialized = await db.init();

if (!initialized) {
    console.log("Problemas na conexão com o BD (fora do ar?)");
    process.exit(1);
} else {
    console.log("Conectou")
}

(async () => {
    views_controller.init()
})();
// var result = Paciente.of("12345678922", "Fernanda de Abreu", new Date(2000, 0, 1), 24)

// if(result.isSuccess){
//      // Em caso de sucesso o objeto está em result.value
//      console.log("-----------------------------------------------------------")
//      const paciente = result.value;
//      console.log(paciente.cpf, paciente.nome, paciente.dtNascimento, paciente.idade);
//      await paciente.save();
// } else console.log(`Erro na criação do Paciente ${result.errors}`);

// await Paciente.create({
//     cpf: '12345678901',
//     nome: 'Maria da Silva',
//     dtNascimento: '2000-05-15',
//     idade: 24
// });

// await Consulta.create({
//     cpf: '12345678901',
//     dtConsulta: '2024-12-10',
//     horaInicio: '08:00',
//     horaFim: '09:00'
// })

// await Consulta.create({
//     cpf: '12345678901',
//     dtConsulta: '2024-12-11',
//     horaInicio: '09:00',
//     horaFim: '10:00'
// })

// const paciente = await Paciente.findOne({
//     where: { cpf: '12345678901' },
//     include: { model: Consulta, as: 'consultas' }
// });

// console.log(paciente.consultas)

// const arrayPacientes = paciente.consultas.map(consultas => consultas.dataValues);

// console.log(arrayPacientes)