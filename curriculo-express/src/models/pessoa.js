const getPessoaModel = (sequelize, { DataTypes }) => {
  const Pessoa = sequelize.define("pessoa", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    telefone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    endereco: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    resumo: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    linkedin: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    github: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  Pessoa.associate = (models) => {
    Pessoa.hasMany(models.ExperienciaAcademica, {
      foreignKey: "pessoaId",
      onDelete: "CASCADE",
    });

    Pessoa.hasMany(models.ExperienciaProfissional, {
      foreignKey: "pessoaId",
      onDelete: "CASCADE",
    });

    Pessoa.hasMany(models.Projeto, {
      foreignKey: "pessoaId",
      onDelete: "CASCADE",
    });
  };

  return Pessoa;
};

export default getPessoaModel;