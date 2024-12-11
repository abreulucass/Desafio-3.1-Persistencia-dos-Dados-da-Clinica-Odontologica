import { Paciente } from "../Paciente.js";

class RepositoryPaciente{
    
    async salva(paciente){
        if(paciente != null) { await paciente.save(); }
    }

    async remove(paciente){
        if(paciente != null) { await paciente.destroy(); }
    }

    async buscaPorCpf(cpf){
        return await Paciente.findByPk(cpf);
    }

    async buscaPorCpfComConsultas(cpf){
        return await Paciente.findOne({
            where: { cpf }, // Busca pelo CPF
            include: 'consultas' // Inclui as consultas relacionadas
        });
    }

    async buscaTodos(){
        return await Paciente.findAll({ include: "consultas" });
    }

    async buscaOrdemCpf(){
        return await Paciente.findAll({ order: [["cpf", "ASC"]], include: "consultas" })
    }

    async buscaOrdemNome(){
        return await Paciente.findAll({ order: [["nome", "ASC"]], include: "consultas" });
    }
}

const repositoryPaciente = new RepositoryPaciente();

export default repositoryPaciente;