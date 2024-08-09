interface Ok<T> {
  isSuccess: true;
  data: T;
}

interface Fail<E> {
  isSuccess: false;
  error: E;
}

export type Result<T, E> = Ok<T> | Fail<E>;

export const Ok = <T>(data: T): Ok<T> => ({ data, isSuccess: true });
export const Fail = <E>(error: E): Fail<E> => ({ error, isSuccess: false });
