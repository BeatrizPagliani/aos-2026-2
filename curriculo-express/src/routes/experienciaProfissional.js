import { Router } from "express";
import { experienciaProfissionalController } from "../controllers/index.js";

const router = Router();

router.get("/", experienciaProfissionalController.getAll);
router.get("/:id", experienciaProfissionalController.getById);
router.post("/", experienciaProfissionalController.create);
router.put("/:id", experienciaProfissionalController.update);
router.delete("/:id", experienciaProfissionalController.remove);

export default router;