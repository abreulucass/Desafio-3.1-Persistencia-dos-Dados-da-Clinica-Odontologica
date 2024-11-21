/**
 * Representa um paciente no consultório.
 * @class Paciente
 */
export class Paciente {
    
    // Atributos privados
    #CPF;
    #nome;
    #dataNascimento;
    #idade;

    /**
     * Cria uma instância de um paciente.
     * 
     * @param {string} CPF - O CPF do paciente.
     * @param {string} nome - O nome do paciente.
     * @param {string} dataNascimento - A data de nascimento do paciente no formato "dd/MM/yyyy".
     * @param {number} idade - A idade do paciente.
     */
    constructor(CPF, nome, dataNascimento, idade) {
        this.#CPF = CPF;
        this.#nome = nome;
        this.#dataNascimento = dataNascimento;
        this.#idade = idade;
    }

    /**
     * Retorna o CPF do paciente.
     * 
     * @returns {string} O CPF do paciente.
     */
    get getCPF() { return this.#CPF; }

    /**
     * Retorna o nome do paciente.
     * 
     * @returns {string} O nome do paciente.
     */
    get getNome() { return this.#nome; }

    /**
     * Retorna a data de nascimento do paciente.
     * 
     * @returns {string} A data de nascimento do paciente no formato "dd/MM/yyyy".
     */
    get getDataNascimento() { return this.#dataNascimento; }

    /**
     * Retorna a idade do paciente.
     * 
     * @returns {number} A idade do paciente.
     */
    get getIdade() { return this.#idade; }

}
