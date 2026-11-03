const getProjetoModel = (sequelize, { DataTypes }) => {
  const Projeto = sequelize.define("projeto", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    tecnologias: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    repositorio: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    link: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  Projeto.associate = (models) => {
    Projeto.belongsTo(models.Pessoa, {
      foreignKey: "pessoaId",
      onDelete: "CASCADE",
    });
  };

  return Projeto;
};

export default getProjetoModel;