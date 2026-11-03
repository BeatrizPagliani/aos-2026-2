import { experienciaAcademicaService } from "../services/index.js";
import createCrudController from "./crudController.js";

export default createCrudController(
  experienciaAcademicaService,
  "Experiência acadêmica"
);