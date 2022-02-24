import { getRepository } from "typeorm";

interface OPT<T> {
  where?: { [P in keyof T]: T[P] };
  payload?: T | T[];
}

interface GetBuilderReturn<T> {
  readonly save: () => Promise<T>;
  readonly remove: () => Promise<T>;
  readonly update: () => T;
}

// mutation without cache
export const getMutation = function <T>(
  Entity: T | any,
  opt: OPT<T>
): GetBuilderReturn<T> {
  const repo = getRepository(Entity);

  getMutation.prototype.save = function () {
    const createdModel = repo.create(opt.payload || {}) as T;
    return repo.save(createdModel);
  };
  getMutation.prototype.update = async function () {
    const item = (await repo.findOne(opt.where)) as T;
    if (!item) throw Error("Not Found");
    await repo.update(opt.where, opt.payload);
    return {
      ...item,
      ...opt.payload,
    };
  };
  getMutation.prototype.remove = async function () {
    const item = await repo.findOneOrFail(opt.where);
    if (!item) throw Error("Not Found");
    return repo.remove(item);
  };

  return getMutation.prototype;
};
