import { Validation } from "./class";
import { ValidationFunction } from "./types";

export const isRequired =
  <T>(errorMessage?: string): ValidationFunction<T> =>
  (validation: Validation<T>) =>
    validation.isRequired(errorMessage);

export const minLength =
  <T>(min: number, errorMessage?: string): ValidationFunction<T> =>
  (validation: Validation<T>) =>
    validation.minLength(min, errorMessage);

export const maxLength =
  <T>(max: number, errorMessage?: string): ValidationFunction<T> =>
  (validation: Validation<T>) =>
    validation.maxLength(max, errorMessage);

export const isEmailOnly =
  <T>(errorMessage?: string): ValidationFunction<T> =>
  (validation: Validation<T>) =>
    validation.emailOnly(errorMessage);

export const rangeNumeric =
  <T>(min: number, max: number, errorMessage?: string): ValidationFunction<T> =>
  (validation: Validation<T>) =>
    validation.rangeNumeric(min, max, errorMessage);

export const enumValue =
  <T>(enums: string[], errorMessage?: string): ValidationFunction<T> =>
  (validation: Validation<T>) =>
    validation.enum(enums, errorMessage);

const validateObject = <T>(data: T, credentials: { [K in keyof T]: ValidationFunction<any>[] }) => {
  const validationResults: { [K in keyof T]?: Validation<T[K]> } = {};

  for (const [key, validations] of Object.entries(credentials) as [keyof T, ValidationFunction<T[keyof T]>[]][]) {
    const field = data[key];
    let validation = new Validation(field);

    for (const validate of validations) {
      validation = validate(validation);
    }

    validationResults[key] = validation;
  }

  const errors = Object.keys(validationResults).reduce((acc, key) => {
    const validation = validationResults[key as keyof T];
    if (validation && !validation.validate()) {
      acc[key] = validation.getMessage();
    }
    return acc;
  }, {} as Record<string, string[]>);

  return {
    validate: Object.keys(errors).length === 0,
    errors: errors,
  };
};

export const createValidator = <T>(data: T, credentials: { [K in keyof T]: ValidationFunction<T[K]>[] }) => validateObject(data, credentials);
