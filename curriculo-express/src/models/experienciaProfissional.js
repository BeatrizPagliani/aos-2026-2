const getExperienciaProfissionalModel = (sequelize, { DataTypes }) => {
  const ExperienciaProfissional = sequelize.define("experienciaProfissional", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    empresa: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cargo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dataInicio: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    dataFim: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });

  ExperienciaProfissional.associate = (models) => {
    ExperienciaProfissional.belongsTo(models.Pessoa, {
      foreignKey: "pessoaId",
      onDelete: "CASCADE",
    });
  };

  return ExperienciaProfissional;
};

export default getExperienciaProfissionalModel;