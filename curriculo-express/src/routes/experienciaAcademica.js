import { Router } from "express";
import { experienciaAcademicaController } from "../controllers/index.js";

const router = Router();

router.get("/", experienciaAcademicaController.getAll);
router.get("/:id", experienciaAcademicaController.getById);
router.post("/", experienciaAcademicaController.create);
router.put("/:id", experienciaAcademicaController.update);
router.delete("/:id", experienciaAcademicaController.remove);

export default router;