import { SchemaValidator } from "@shared/domain/schemas/schema-validator.schema";
import { object, ref, string } from "yup";

export const signUpBodySchema: SchemaValidator = {
  body: object({
    name: string().required(),
    email: string().email().required(),
    password: string().required(),
    passwordConfirmation: string().oneOf([ref("password"), null], "Passwords must match"),
  }),
};
