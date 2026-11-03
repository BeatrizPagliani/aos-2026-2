import { pessoaService } from "../services/index.js";
import createCrudController from "./crudController.js";

export default createCrudController(pessoaService, "Pessoa");