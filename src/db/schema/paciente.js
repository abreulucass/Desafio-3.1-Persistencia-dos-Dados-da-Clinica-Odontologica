
/**
 * Função responsável por criar e configurar o modelo de dados 'Paciente' no banco de dados.
 * Define a estrutura da tabela 'Pacientes' e suas configurações.
 * 
 * @param {Object} Paciente - O modelo de Paciente fornecido pelo Sequelize.
 * @param {Object} sequelize - A instância de conexão com o banco de dados.
 * @param {Object} DataTypes - O módulo de tipos de dados do Sequelize.
 */
const createModelPaciente = (Paciente, sequelize, DataTypes) => {
    Paciente.init(
        {
            /**
             * CPF do paciente.
             * Tipo: STRING (11 caracteres)
             * Primary Key: Sim
             * Não permite valor nulo (allowNull: false).
             */
            cpf: { 
                type: DataTypes.STRING(11),
                primaryKey: true,
                allowNull: false },
            
            /**
             * Nome completo do paciente.
             * Tipo: STRING (máximo de 100 caracteres)
             * Não permite valor nulo (allowNull: false).
             */    
            nome: { 
                type: DataTypes.STRING(100), 
                allowNull: false },

            /**
             * Data de nascimento do paciente.
             * Tipo: DATEONLY (apenas a data no formato YYYY-MM-DD)
             * Não permite valor nulo (allowNull: false).
             */
            dtNascimento: { 
                type: DataTypes.DATEONLY, 
                allowNull: false },

            /**
             * Idade do paciente.
             * Tipo: INTEGER (número inteiro)
             * Não permite valor nulo (allowNull: false).
             */
            idade: { 
                type: DataTypes.INTEGER, 
                allowNull: false },
        },
        {
            sequelize,
            modelName: 'Paciente', 
            tableName: 'Pacientes', 

             /**
             * Define um índice único para o campo 'cpf', garantindo que não existam dois pacientes com o mesmo CPF.
             */
            indexes: [{ unique: true, fields: ["cpf"] }],
        }
    );
}

export default createModelPaciente;