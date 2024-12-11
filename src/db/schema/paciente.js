
const createModelPaciente = (Paciente, sequelize, DataTypes) => {
    Paciente.init(
        {
            cpf: { 
                type: DataTypes.STRING(11),
                primaryKey: true,
                allowNull: false },
            nome: { 
                type: DataTypes.STRING(100), 
                allowNull: false },
            dtNascimento: { 
                type: DataTypes.DATEONLY, 
                allowNull: false },
            idade: { 
                type: DataTypes.INTEGER, 
                allowNull: false },
        },
        {
            sequelize,
            modelName: 'Paciente', 
            tableName: 'Pacientes', 
            indexes: [{ unique: true, fields: ["cpf"] }],
        }
    );
}

export default createModelPaciente;