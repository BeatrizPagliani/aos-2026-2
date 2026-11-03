import { Router } from "express";
import { pessoaController } from "../controllers/index.js";

const router = Router();

router.get("/", pessoaController.getAll);
router.get("/:id", pessoaController.getById);
router.post("/", pessoaController.create);
router.put("/:id", pessoaController.update);
router.delete("/:id", pessoaController.remove);

export default router;