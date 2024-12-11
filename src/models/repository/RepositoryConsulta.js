import { Consulta } from "../Consulta.js";
import { Op } from "sequelize";

class RepositoryConsulta{
    
    async salva(consulta){
        if(consulta != null) { await consulta.save(); }
    }

    async remove(consulta){
        if(consulta != null) { await consulta.destroy(); }
    }

    async buscarConsultasPorCPF(cpf){
        return await Consulta.findAll({ 
            where: { 
            cpf: cpf},
            order: [['dtConsulta', 'ASC']] });
    }

    async buscarConsultasPorData(dt){
        return await Consulta.findAll({ 
            where: { 
            dtConsulta: dt}
            })
    }

    async buscarConsultaPorCpfEData(cpf, dtConsulta, horaInicio){
        return await Consulta.findOne({
            where: { cpf, dtConsulta, horaInicio }
        });
    }

    async buscarTodas(){
        return await Consulta.findAll({
            order: [
                ['dtConsulta', 'ASC'],  
                ['horaInicio', 'ASC']  
            ],
            include: "paciente" });
    }

    async buscarPorPeriodo(ini, fim){
        return await Consulta.findAll({ 
            order: [
                ["dtConsulta", "ASC"],
                ['horaInicio', 'ASC']
            ], 
            include: "paciente", 
            where:{
                dtConsulta:{
                    [Op.between]: [ini, fim]
                }
        } })
    }

}

const repositoryConsulta = new RepositoryConsulta();

export default repositoryConsulta;