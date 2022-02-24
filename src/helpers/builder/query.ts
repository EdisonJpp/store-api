import { isNil, omitBy } from "lodash";
import { getRepository, FindManyOptions } from "typeorm";

export function getFind<T>(Entity: T | any, opt: FindManyOptions<T>) {
  getFind.prototype.findOne = (): Promise<T> => {
    const repo = getRepository(Entity);
    return repo.findOne(opt) as Promise<T>;
  };

  getFind.prototype.findAll = () => {
    const where = omitBy(opt.where || {}, isNil);
    const repo = getRepository(Entity);
    return repo.find({ ...opt, where }) as Promise<T[]>;
  };

  return getFind.prototype;
}
