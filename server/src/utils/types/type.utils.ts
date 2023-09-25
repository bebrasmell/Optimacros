export type Keys<T> = keyof T;
export type Deconstructor<T> = [Keys<T>, T[Keys<T>]][];