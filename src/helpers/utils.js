import { DateTime } from "luxon";

/**
 * Classe de utilitários para operações relacionadas a datas e tempo.
 */
export class utils {
    
    /**
     * Calcula a idade de uma pessoa com base na data de nascimento fornecida.
     * 
     * @param {DateTime} dt - A data de nascimento da pessoa como um objeto `DateTime` do Luxon.
     * @returns {number} A idade calculada em anos.
     */
    static calculoIdade(dt) {
        const dt_now = DateTime.now();
    
        let idade = dt_now.year - dt.year;
        
        // Ajuste para o caso de o aniversário ainda não ter ocorrido neste ano
        if (dt_now.month < dt.month || (dt_now.month === dt.month && dt_now.day < dt.day)) {
            idade--;
        }
        
        return idade;
    }

    /**
     * Converte uma data no formato "dd/MM/yyyy" para um objeto `DateTime` do Luxon.
     * 
     * @param {string} data - A data no formato "dd/MM/yyyy".
     * @returns {DateTime|boolean} Retorna um objeto `DateTime` se a data for válida, ou `false` caso contrário.
     */
    static formatarData(data) {
        const [dia, mes, ano] = data.split('/').map(Number);
    
        const dataFormatada = DateTime.local(ano, mes, dia);
    
        // Verifica se a data gerada é válida
        if (!dataFormatada.isValid) {
            return false;
        }
    
        return dataFormatada;
    }
    
    /**
    * Formata uma string de hora no formato "HHMM" para o formato "HH:MM".
    * @param {string} horaHHMM - A string representando a hora no formato "HHMM" (ex: "0930" para 09:30).
    * @returns {string} - Retorna a hora formatada no padrão "HH:MM".
    */
    static formatarHoraHHMMparaTIME = (horaHHMM) => {
        const horas = horaHHMM.slice(0, 2);
        const minutos = horaHHMM.slice(2, 4);
        return `${horas}:${minutos}`;
    };

    /**
     * Calcula a duração entre duas horas fornecidas.
     * 
     * @param {DateTime} horaInicial - A hora inicial como um objeto `DateTime` do Luxon.
     * @param {DateTime} horaFinal - A hora final como um objeto `DateTime` do Luxon.
     * @returns {string} A duração da consulta no formato "hh:mm".
     */
    static calcularTempoConsulta(horaInicial, horaFinal) {
        const duracao = horaFinal.diff(horaInicial, ["hours", "minutes"]);
        const horas = String(duracao.hours).padStart(2, "0");
        const minutos = String(duracao.minutes).padStart(2, "0");

        return `${horas}:${minutos}`;
    }

    
}
