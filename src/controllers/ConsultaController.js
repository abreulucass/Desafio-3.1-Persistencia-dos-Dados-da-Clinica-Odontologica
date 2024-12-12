import repositoryConsulta from "../models/repository/RepositoryConsulta.js";
import { Result } from "../helpers/result.js";
import { Consulta } from "../models/Consulta.js";


/**
* Controller responsável pelo gerenciamento de consultas no sistema.
* Contém métodos para cadastrar, listar e cancelar agendamentos de consultas.
*/

export class ConsultaController{

    /**
     * Verifica se um paciente possui agendamentos pendentes no futuro.
     * @param {string} cpf - O CPF do paciente a ser verificado.
     * @returns {Promise<boolean>} - Retorna true se houver consultas futuras, false caso contrário.
     */
    async isPacientePossuiAgendamentoPendente(cpf){
        let listaConsultasPaciente = await repositoryConsulta.buscarConsultasPorCPF(cpf)

        if(listaConsultasPaciente.length !== 0){
            listaConsultasPaciente = listaConsultasPaciente.map(agendamento => agendamento.dataValues)

            const consultasFuturas = listaConsultasPaciente.filter(agendamento => {
                const dataHoraConsulta = new Date(`${agendamento.dtConsulta}T${agendamento.horaInicio}`);
                return dataHoraConsulta > new Date();
            });

            if(consultasFuturas.length !== 0){
                return true
            } else {
                return false
            }
        }
    }

    /**
     * Agenda uma nova consulta para um paciente.
     * @param {Object} consulta - Objeto contendo as informações da consulta (CPF, DataConsulta, horaIni, horaFim).
     * @returns {Promise<Result>} - Retorna um objeto de resultado (sucesso ou falha).
     */
    async agendarConsulta(consulta){
        let listaAgendamentos = await repositoryConsulta.buscarConsultasPorData(consulta.DataConsulta)


        if(listaAgendamentos.length !== 0){
            listaAgendamentos = listaAgendamentos.map(agendamento => agendamento.dataValues)


            const sobreposto = listaAgendamentos.some(agendamento => {
                console.log(agendamento.dtConsulta, consulta.DataConsulta)
                console.log(consulta.horaIni, consulta.horaFim)
                console.log(agendamento.horaInicio, agendamento.horaFim)
                return (
                    agendamento.dtConsulta === consulta.DataConsulta && 
                    (
                        (consulta.horaIni >= agendamento.horaInicio && consulta.horaIni < agendamento.horaFim) ||
                        (consulta.horaFim > agendamento.horaInicio && consulta.horaFim <= agendamento.horaFim) ||
                        (consulta.horaIni <= agendamento.horaInicio && consulta.horaFim >= agendamento.horaFim)
                    )
                );
            });

            if (sobreposto) {
                return Result.failure(-2);
            } 
        }

        const result = Consulta.objFactory(consulta.CPF, consulta.DataConsulta, consulta.horaIni, consulta.horaFim);
        
        if (result.isSuccess){
            const agendamento = result.value;
            await repositoryConsulta.salva(agendamento)
            return result;
        } else {
            return result;
        }
    }

    /**
     * Lista todos os agendamentos de consulta registrados no sistema.
     * @returns {Promise<Array<Object>|null>} - Retorna uma lista de agendamentos ou null se não houver agendamentos.
     */
    async listarTodosAgendamento(){
        let listaAgendamentos = await repositoryConsulta.buscarTodas();

        if(listaAgendamentos.length === 0){
            return null;
        }

        listaAgendamentos = listaAgendamentos.map(agendamento => agendamento.dataValues)

        return listaAgendamentos;
    }

     /**
     * Lista os agendamentos de consulta dentro de um intervalo de datas.
     * @param {string} ini - Data de início do período.
     * @param {string} fim - Data de fim do período.
     * @returns {Promise<Array<Object>|null>} - Retorna uma lista de agendamentos ou null se não houver agendamentos no período.
     */
    async listarPeriodoAgendamento(ini, fim){
        let listaAgendamentos = await repositoryConsulta.buscarPorPeriodo(ini, fim);

        if(listaAgendamentos.length === 0){
            return null;
        }

        listaAgendamentos = listaAgendamentos.map(agendamento => agendamento.dataValues)

        return listaAgendamentos;
    }

    /**
     * Cancela uma consulta previamente agendada.
     * @param {Object} form - Objeto contendo os dados necessários para identificar a consulta (CPF, dtConsulta, horaInicio).
     * @returns {Promise<Result>} - Retorna um objeto de resultado (sucesso ou falha).
     */
    async cancelarConsulta(form){

        const consulta = await repositoryConsulta.buscarConsultaPorCpfEData(form.CPF, form.dtConsulta, form.horaInicio)

        if(consulta === null){
            return Result.failure(-1)
        }

        await repositoryConsulta.remove(consulta)

        return Result.success(true)
    }
}

const consultaController = new ConsultaController();

export default consultaController;