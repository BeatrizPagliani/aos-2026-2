import models from "../models/index.js";
import createCrudService from "./crudService.js";

export default createCrudService("Pessoa", {
  include: [
    models.ExperienciaAcademica,
    models.ExperienciaProfissional,
    models.Projeto,
  ],
});