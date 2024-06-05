import { Validation } from "./class";

export type ValidationFunction<T> = (validation: Validation<T>) => Validation<T>;
