# PawValidator - Simplified Object Validation

**PawValidator** is a lightweight TypeScript library designed to simplify and streamline the process of data validation in TypeScript projects. With PawValidator, you can easily define and apply validation rules to your data, ensuring its integrity and validity.

## Get Started

To start using **PawValidator** in your TypeScript projects, simply install it via npm:

```bash
npm install paw-validator
```

Then, import the necessary functions and start validating your data effortlessly!

## Key Features

1. **Simple and Lightweight:** PawValidator is designed to be simple and lightweight, providing essential validation functionalities without unnecessary complexity.

2. **Type-Safe:** Built with TypeScript, PawValidator ensures type safety throughout the validation process, reducing the risk of runtime errors.

3. **Flexible Validation Rules:** Define custom validation rules using simple functions, allowing you to tailor the validation process to your specific requirements.

4. **Validation Composition:** Easily compose multiple validation rules for complex validation scenarios, ensuring comprehensive data validation.

5. **Error Handling:** PawValidator provides detailed error handling, allowing you to identify and handle validation errors efficiently.

6. **Object Validation:** Validate entire objects with ease, making it suitable for various use cases.

## Usage Example

```typescript
import { createValidator, validateObject, isRequired, minLenght } from "paw-validator";

// Define interface (optionals)
interface UserDto {
  username: string;
  password: string;
}

// Define object value
const data: UserDto = {
  username: "exampleusername",
  password: "secret-123",
};

// Create validation rules for each property of the object
const credentials = createValidator<UserDto>({
  username: [isRequired(), minLength(4), maxLength(10)],
  password: [isRequired(), minLength(4), maxLength(10)],
});

// Create Error Handling to implements the credentials to object value
const { validate, errors } = validateObject(data, credentials);

console.log(validate); // true if valid, false otherwise
console.log(errors); // error messages if any
```

## API Documentation

### createValidator(cred)

The `createValidator` function is a utility designed to facilitate the creation of validation rules for objects based on a specified data structure.

**Parameters**

- `credentials`: An object specifying validation rules for each property of the object to be validated. It uses TypeScript's mapped types to ensure that each property of T is associated with an array of validation functions.

**Returns**

- An object representing the validation rules for each property of the object.

### validateObject(data, credentials)

The `validateObject` function is a utility designed to validate an object against a set of predefined validation rules. It takes in the object to be validated and a set of validation rules, then iterates through each property of the object, applying the corresponding validation functions.

**Parameters**

- `data`: The object to be validated. Its structure must match the type T.
- `credials`: An object specifying validation rules for each property of the data object. It is defined using TypeScript's mapped types to ensure that each property of data is associated with an array of validation functions.

**Returns**

- `validate`: A boolean value indicating whether the object passed all validation rules (true if valid, false otherwise).
- `errors`: A function returning detailed error messages for each property that failed validation.

### Built-in Validators

**PawValidator** provides the following built-in validators:

- `isRequired(errorMessage)`: Validates whether the string is a non-empty value.
- `emailOnly(errorMessage)`: Validates whether the string is in Email Format.
- `maxLength(max, errorMessage)`: Validates the maximum length of the value.
- `minLength(min, errorMessage)`: Validates the minimum length of the value.
- `rangeNumeric(min, max, errorMessage)`: Validates the range of numeric values.
- `enum(enums, errorMessage)`: Validates that the value is within a specified set.

**Note:** All errorMessage parameters are optional for customizing your error message responses. You can modify them as needed.

## Contributing

**PawValidator** is an open-source project, and contributions are welcome! If you encounter any issues, have feature requests, or want to contribute improvements. To contribute, please follow the guidelines in [CONTRIBUTING.md](CONTRIBUTING.md).

## License

**PawValidator** is licensed under the MIT License, allowing for both personal and commercial use with attribution. - see the [LICENSE](LICENSE) file for details.
