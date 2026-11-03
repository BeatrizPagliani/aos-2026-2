import { projetoService } from "../services/index.js";
import createCrudController from "./crudController.js";

export default createCrudController(projetoService, "Projeto");