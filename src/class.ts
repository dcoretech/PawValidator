export class Validation<T> {
  field: string | null | undefined;
  errorMessage: string[];
  required: boolean;

  constructor(field: T | null | undefined) {
    this.field = String(field);
    this.required = false;
    this.errorMessage = [];
  }

  isRequired(errorMessage?: string) {
    this.required = true;
    if (this.field == null || this.field === "") {
      this.errorMessage.push(errorMessage ?? "This field is Required");
    }
    return this;
  }

  maxLength(max: number, errorMessage?: string) {
    if (!this.required && (this.field == null || this.field === "")) return this;

    if (typeof this.field === "string" && this.field.length > max) {
      this.errorMessage.push(errorMessage ?? `This field max ${max} characters`);
    }
    return this;
  }

  minLength(min: number, errorMessage?: string) {
    if (!this.required && (this.field == null || this.field === "")) return this;

    if (typeof this.field === "string" && this.field.length < min) {
      this.errorMessage.push(errorMessage ?? `This field min ${min} characters`);
    }
    return this;
  }

  emailOnly(errorMessage?: string) {
    if (!this.required && (this.field == null || this.field === "")) return this;

    const pattern: RegExp = new RegExp(
      "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \\t]|(\\[\\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\\t -Z^-~]*])"
    );

    if (typeof this.field === "string" && !pattern.test(this.field)) {
      this.errorMessage.push(errorMessage ?? "This field must be in Email format");
    }

    return this;
  }

  rangeNumeric(min: number, max: number, errorMessage?: string) {
    if (!this.required && (this.field == null || this.field === "")) return this;

    const numeric = parseFloat(this.field as string);

    if (isNaN(numeric)) {
      this.errorMessage.push("This field must be numeric");
    } else if (numeric < min || numeric > max) {
      this.errorMessage.push(errorMessage ?? `This field must be between ${min} and ${max}`);
    }

    return this;
  }

  enum(enums: string[], errorMessage?: string) {
    if (!this.required && (this.field == null || this.field === "")) return this;

    if (!enums.includes(this.field as string)) {
      this.errorMessage.push(errorMessage ?? `This field must be one of ${enums.toString()}`);
    }

    return this;
  }

  validate() {
    return this.errorMessage.length === 0;
  }

  getMessage() {
    return this.errorMessage;
  }
}
