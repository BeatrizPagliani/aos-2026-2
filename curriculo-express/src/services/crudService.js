import models from "../models/index.js";

const createCrudService = (modelName, options = {}) => {
  const model = models[modelName];
  const queryOptions = options.include ? { include: options.include } : {};

  const getAll = async () => await model.findAll(queryOptions);

  const getById = async (id) => await model.findByPk(id, queryOptions);

  const create = async (data) => await model.create(data);

  const update = async (id, data) => {
    const record = await getById(id);
    if (!record) return null;
    return await record.update(data);
  };

  const remove = async (id) => {
    const count = await model.destroy({ where: { id } });
    return count > 0;
  };

  return { getAll, getById, create, update, remove };
};

export default createCrudService;