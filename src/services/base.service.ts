import { validate, ValidationError } from 'class-validator';

export default class BaseService<T, V> {
  baseRepository: V;

  constructor(ClassName: new () => V) {
    this.baseRepository = new ClassName();
  }

  public validation = async (object: T): Promise<void> => {
    const errors = await validate(object);
    let str: string[] = [];

    errors.forEach((error) => {
      const constraints:ValidationError = error.constraints as unknown as ValidationError;
      str = str.concat(Object.values(constraints));
    });

    if (str.length) {
      throw new Error(str.join(', '));
    }
  };
}
