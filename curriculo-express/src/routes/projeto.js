import { Router } from "express";
import { projetoController } from "../controllers/index.js";

const router = Router();

router.get("/", projetoController.getAll);
router.get("/:id", projetoController.getById);
router.post("/", projetoController.create);
router.put("/:id", projetoController.update);
router.delete("/:id", projetoController.remove);

export default router;