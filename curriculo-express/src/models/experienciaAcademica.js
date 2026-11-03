const getExperienciaAcademicaModel = (sequelize, { DataTypes }) => {
  const ExperienciaAcademica = sequelize.define("experienciaAcademica", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    instituicao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    curso: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nivel: {
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

  ExperienciaAcademica.associate = (models) => {
    ExperienciaAcademica.belongsTo(models.Pessoa, {
      foreignKey: "pessoaId",
      onDelete: "CASCADE",
    });
  };

  return ExperienciaAcademica;
};

export default getExperienciaAcademicaModel;