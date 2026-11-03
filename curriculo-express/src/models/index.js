import Sequelize from "sequelize";
import pg from "pg";

import getUserModel from "./user.js";
import getMessageModel from "./message.js";
import getPessoaModel from "./pessoa.js";
import getExperienciaAcademicaModel from "./experienciaAcademica.js";
import getExperienciaProfissionalModel from "./experienciaProfissional.js";
import getProjetoModel from "./projeto.js";

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectModule: pg,
});

const models = {
  User: getUserModel(sequelize, Sequelize),
  Message: getMessageModel(sequelize, Sequelize),
  Pessoa: getPessoaModel(sequelize, Sequelize),
  ExperienciaAcademica: getExperienciaAcademicaModel(sequelize, Sequelize),
  ExperienciaProfissional: getExperienciaProfissionalModel(sequelize, Sequelize),
  Projeto: getProjetoModel(sequelize, Sequelize),
};

Object.keys(models).forEach((key) => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };
export default models;