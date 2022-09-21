import { SchemaValidator } from "@shared/domain/schemas/schema-validator.schema";
import { object, string } from "yup";

export const signInBodySchema: SchemaValidator = {
  body: object({
    email: string().email().required(),
    password: string().required(),
  }),
};
