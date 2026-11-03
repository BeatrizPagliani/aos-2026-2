import Sequelize from "sequelize";
import pg from "pg";

import getUserModel from "./user.js";
import getMessageModel from "./message.js";
import getPessoaModel from "./pessoa.js";
import getExperienciaAcademicaModel from "./experienciaAcademica.js";
import getExperienciaProfissionalModel from "./experienciaProfissional.js";
import getProjetoModel from "./projeto.js";

const DATABASE_URL = "postgresql://neondb_owner:npg_am1hQPtZj4Eo@ep-holy-rice-b6msdoje-pooler.c-2.sa-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: "postgres",
  dialectModule: pg,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
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