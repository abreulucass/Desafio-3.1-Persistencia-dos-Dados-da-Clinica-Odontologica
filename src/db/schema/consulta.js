
const createModelConsulta = (Consulta, sequelize, DataTypes) => {
    Consulta.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
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
            dtConsulta: { type: DataTypes.DATEONLY, allowNull: false },
            horaInicio: { type: DataTypes.TIME, allowNull: false },
            horaFim: { type: DataTypes.TIME, allowNull: false },
        },
        {
            sequelize,
            indexes: [{ unique: true, fields: ["id"] }],
        }
    );
}

export default createModelConsulta;