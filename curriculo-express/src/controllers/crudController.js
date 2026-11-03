import { AppError } from "../utils/index.js";

const createCrudController = (service, entityName) => {
  const getAll = async (req, res) => {
    const records = await service.getAll();
    return res.status(200).json(records);
  };

  const getById = async (req, res) => {
    const record = await service.getById(req.params.id);

    if (!record) {
      throw new AppError(`${entityName} não encontrado(a).`, 404);
    }

    return res.status(200).json(record);
  };

  const create = async (req, res) => {
    const record = await service.create(req.body || {});
    return res.status(201).json(record);
  };

  const update = async (req, res) => {
    const record = await service.update(req.params.id, req.body || {});

    if (!record) {
      throw new AppError(`${entityName} não encontrado(a).`, 404);
    }

    return res.status(200).json(record);
  };

  const remove = async (req, res) => {
    const deleted = await service.remove(req.params.id);

    if (!deleted) {
      throw new AppError(`${entityName} não encontrado(a).`, 404);
    }

    return res.status(204).send();
  };

  return { getAll, getById, create, update, remove };
};

export default createCrudController;