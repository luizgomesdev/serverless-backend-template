import { BaseSchema } from "yup";

export interface SchemaValidator {
  body?: BaseSchema;
  queryStringParameters?: BaseSchema;
}
