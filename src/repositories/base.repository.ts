import { getConnection, Repository } from 'typeorm';

export default class BaseRepository<T> {
  entityName: string;

  constructor(className: new () => T) {
    this.entityName = className.name;
  }

  get baseRepository(): Repository<T> {
    return getConnection().manager.getRepository(this.entityName);
  }
}
