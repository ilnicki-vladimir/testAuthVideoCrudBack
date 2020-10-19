import { ResponseEntity } from '../utils/response.entity';

export default class BaseController<T, V> {
  baseService: T;

  constructor(ClassName: new () => T) {
    this.baseService = new ClassName();
  }

  successEntity = (
    status: number,
    data?: V | V[] | string,
  ): ResponseEntity<V> => ({
    status,
    data,
  });

  errorEntity = (
    status: number,
    message?: string,
    data?: V | V[] | string,
  ): ResponseEntity<V> => ({
    status,
    message,
    data,
  });
}
