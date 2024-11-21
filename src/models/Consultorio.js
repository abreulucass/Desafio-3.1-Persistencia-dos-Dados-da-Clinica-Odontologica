
import { DateTime } from "luxon";

/**
 * Representa um consultório com pacientes e uma agenda de consultas.
 * @class Consultorio
 */

export class Consultorio{
    // Atributos
    #pacientes = [];
    #agenda_de_consultas = [];

    //  gets
    /**
     * Retorna a lista de pacientes do consultório.
     * 
     * @returns {Array} Retorna o array de pacientes.
     */
    get getPacientes(){ return this.#pacientes }

      /**
     * Retorna a agenda de consultas do consultório.
     * 
     * @returns {Array} Retorna o array de agendamentos de consultas.
     */
    get getAgenda(){ return this.#agenda_de_consultas; }

    /**
     * Insere um novo paciente no consultório.
     * 
     * @param {Object} paciente - O paciente a ser inserido.
     * @returns {number} Retorna 1 para indicar que o paciente foi inserido.
     */
    inserirPaciente(paciente){
        this.#pacientes.push(paciente)

        return 1;
    }

     /**
     * Verifica se um paciente existe no consultório com base no CPF.
     * 
     * @param {string} CPF - O CPF do paciente.
     * @returns {boolean} Retorna `true` se o paciente existir, `false` caso contrário.
     */
    pacienteExiste(CPF) {
        return this.#pacientes.some(paciente => paciente.getCPF === CPF);
    }

    /**
     * Busca o índice de um paciente com base no CPF.
     * 
     * @param {string} CPF - O CPF do paciente.
     * @returns {number} Retorna o índice do paciente no array, ou -1 se não encontrado.
     */
    buscarIndexPaciente(CPF){
        return this.#pacientes.findIndex(paciente => paciente.getCPF == CPF );
    }

    /**
     * Busca um paciente no consultório com base no CPF.
     * 
     * @param {string} CPF - O CPF do paciente.
     * @returns {Object|null} Retorna o paciente encontrado ou `null` se não encontrado.
     */
    buscarPaciente(CPF){
        const index = this.#pacientes.findIndex(paciente => paciente.getCPF == CPF );

        return this.#pacientes[index];
    }

    /**
     * Remove um paciente do consultório com base no índice.
     * 
     * @param {number} index_paciente - O índice do paciente a ser removido.
     * @returns {Array} Retorna um array com o paciente removido.
     */
    removerPaciente(index_paciente){
        return this.#pacientes.splice(index_paciente, 1);
    }

     /**
     * Valida se há sobreposição de agendamento com outra consulta.
     * 
     * @param {string} dataConsulta - A data da consulta a ser agendada no formato "dd/MM/yyyy".
     * @param {string} horaInicial - A hora de início da consulta no formato "HHmm".
     * @param {string} horaFinal - A hora de término da consulta no formato "HHmm".
     * @returns {boolean} Retorna `true` se não houver sobreposição, `false` caso contrário.
     */
    validarSobreposicaoConsulta(dataConsulta, horaInicial, horaFinal) {

        const dt_consulta = DateTime.fromFormat(dataConsulta, "dd/MM/yyyy")
        const hr_ini = DateTime.fromFormat(horaInicial, "HHmm")
        const hr_fim = DateTime.fromFormat(horaFinal, "HHmm")

        const sobreposto = this.#agenda_de_consultas.some(ag => {
            const agDataConsulta = DateTime.fromFormat(ag.getDataConsulta, "dd/MM/yyyy");
            const agHoraInicial = DateTime.fromFormat(ag.getHoraInicio, "HHmm");
            const agHoraFinal = DateTime.fromFormat(ag.getHoraFim, "HHmm");

           
            return (
                agDataConsulta.toISODate() === dt_consulta.toISODate() && 
                (
                    (hr_ini >= agHoraInicial && hr_ini < agHoraFinal) ||
                    (hr_fim > agHoraInicial && hr_fim <= agHoraFinal) ||
                    (hr_ini <= agHoraInicial && hr_fim >= agHoraFinal)
                )
            );
        });

        if (sobreposto) {
            return false;
        } else {
            return true;
        }
    }

     /**
     * Verifica se um paciente tem um agendamento futuro único.
     * 
     * @param {string} CPF - O CPF do paciente.
     * @returns {boolean} Retorna `true` se o paciente não tiver outro agendamento futuro, `false` caso contrário.
     */
    validarAgendamentoUnico(CPF) {
        const agora = DateTime.now();
        return !this.#agenda_de_consultas.some(
            (agendamento) => agendamento.getPaciente.getCPF === CPF &&
            DateTime.fromFormat(agendamento.getDataConsulta, "dd/MM/yyyy") > agora
        );
    }

     /**
     * Agenda uma nova consulta.
     * 
     * @param {Object} consulta - A consulta a ser agendada.
     * @returns {number} Retorna 1 para indicar que a consulta foi agendada.
     */
    agendarConsulta(consulta){
        this.#agenda_de_consultas.push(consulta)
        return 1;
    }

     /**
     * Lista os agendamentos de consulta, podendo ser filtrado por data.
     * 
     * @param {string} tipo - O tipo de filtro, pode ser "P" para filtrar por período.
     * @param {string|null} dataInicio - A data de início do período (opcional).
     * @param {string|null} dataFim - A data de término do período (opcional).
     * @returns {Array} Retorna um array de agendamentos filtrados e ordenados.
     */
    listarAgenda(tipo, dataInicio = null, dataFim = null) {
        const inicio = dataInicio ? DateTime.fromFormat(dataInicio, "dd/MM/yyyy") : null;
        const fim = dataFim ? DateTime.fromFormat(dataFim, "dd/MM/yyyy") : null;

        let agendamentosFiltrados = this.#agenda_de_consultas;

        if (tipo === "P" && inicio && fim) {
            agendamentosFiltrados = this.#agenda_de_consultas.filter((agendamento) => {
                const dataConsulta = DateTime.fromFormat(agendamento.getDataConsulta, "dd/MM/yyyy");
                return dataConsulta >= inicio && dataConsulta <= fim;
            });
        }

        agendamentosFiltrados.sort((a, b) => {
            const dataHoraA = DateTime.fromFormat(
                `${a.getDataConsulta} ${a.getHoraInicial}`,
                "dd/MM/yyyy HHmm"
            );
            const dataHoraB = DateTime.fromFormat(
                `${b.getDataConsulta} ${b.getHoraInicial}`,
                "dd/MM/yyyy HHmm"
            );
            return dataHoraA - dataHoraB;
        });

        return agendamentosFiltrados;
    }

     /**
     * Cancela um agendamento de consulta.
     * 
     * @param {string} CPF - O CPF do paciente cujo agendamento será cancelado.
     * @param {string} dataConsulta - A data da consulta a ser cancelada no formato "dd/MM/yyyy".
     * @param {string} horaInicial - A hora de início da consulta a ser cancelada no formato "HHmm".
     * @returns {number} Retorna 1 se o cancelamento for bem-sucedido, -1 se o agendamento não existir, ou -2 se não for possível cancelar.
     */
    cancelarAgendamento(CPF, dataConsulta, horaInicial) {
        const agora = DateTime.now();

        const agendamento = this.#agenda_de_consultas.find(ag => ag.getPaciente.getCPF === CPF && ag.getDataConsulta === dataConsulta && ag.getHoraInicio === horaInicial);

        if (!agendamento) {
            return -1;
        }

        const dataAgendamento = DateTime.fromFormat(dataConsulta, "dd/MM/yyyy");
        const horaAgendamento = DateTime.fromFormat(horaInicial, "HHmm");

        if (dataAgendamento > agora || (dataAgendamento.equals(agora) && horaAgendamento > agora)) {
            this.#agenda_de_consultas = this.#agenda_de_consultas.filter(ag => ag !== agendamento);
            return 1;
        } else {
            return -2;
        }
    }
}