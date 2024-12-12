
/**
 * Função responsável por criar e configurar o modelo de dados 'Consulta' no banco de dados.
 * Define a estrutura da tabela 'Consultas' e suas relações.
 * 
 * @param {Object} Consulta - O modelo de consulta fornecido pelo Sequelize.
 * @param {Object} sequelize - A instância de conexão com o banco de dados.
 * @param {Object} DataTypes - O módulo de tipos de dados do Sequelize.
 */
const createModelConsulta = (Consulta, sequelize, DataTypes) => {
    Consulta.init(
        {
            /**
             * ID único para identificar cada consulta.
             * Tipo: UUID (gerado automaticamente) 
             * Primary Key: Sim
             */
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            /**
             * CPF do paciente associado à consulta.
             * Tipo: STRING (11 caracteres)
             * Não permite valor nulo (allowNull: false).
             * Define uma relação (foreign key) com a tabela 'Pacientes' na coluna 'cpf'.
             * Se o CPF for alterado ou excluído na tabela 'Pacientes', a atualização ou exclusão será refletida aqui (onUpdate e onDelete).
             */
            cpf: {
                type: DataTypes.STRING(11), 
                allowNull: false, 
                references: { 
                  model: 'Pacientes', 
                  key: 'cpf' 
                },
                onUpdate: 'CASCADE', 
                onDelete: 'CASCADE'
            },

            /**
             * Data da consulta.
             * Tipo: DATEONLY (apenas a parte da data, no formato YYYY-MM-DD).
             * Não permite valor nulo (allowNull: false).
             */
            dtConsulta: { type: DataTypes.DATEONLY, allowNull: false },

            /**
             * Hora de início da consulta.
             * Tipo: TIME (apenas a parte da hora, no formato HH:MM:SS).
             * Não permite valor nulo (allowNull: false).
             */
            horaInicio: { type: DataTypes.TIME, allowNull: false },

             /**
             * Hora de fim da consulta.
             * Tipo: TIME (apenas a parte da hora, no formato HH:MM:SS).
             * Não permite valor nulo (allowNull: false).
             */
            horaFim: { type: DataTypes.TIME, allowNull: false },
        },
        {
            sequelize,
            modelName: 'Consulta', 
            tableName: 'Consultas',
            /**
             * Define um índice único para a coluna 'id', garantindo que não existam dois registros com o mesmo 'id'.
             */
            indexes: [{ unique: true, fields: ["id"] }],
        }
    );
}

export default createModelConsulta;