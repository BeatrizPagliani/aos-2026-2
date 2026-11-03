import { experienciaProfissionalService } from "../services/index.js";
import createCrudController from "./crudController.js";

export default createCrudController(
  experienciaProfissionalService,
  "Experiência profissional"
);