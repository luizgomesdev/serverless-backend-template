import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import middyJsonBodyParser from "@middy/http-json-body-parser";
import { SchemaValidator } from "@shared/domain/schemas/schema-validator.schema";
import { accessControlMiddleware } from "@shared/middlewares/access-control.middleware";
import { schemaValidatorMiddleware } from "@shared/middlewares/schema-validator.middleware";
import { Handler } from "aws-lambda";
import { AccessControlSchema } from "./../domain/schemas/access-control.schema";

type MiddyfyOptions = {
  schemaValidator?: SchemaValidator;
  accessControlSchema?: AccessControlSchema;
};

export const middyfy = (handler: Handler, options?: MiddyfyOptions) => {
  return middy(handler).use([
    middyJsonBodyParser(),
    httpErrorHandler({}),
    ...(options?.schemaValidator ? [schemaValidatorMiddleware(options.schemaValidator)] : []),
    ...(options?.accessControlSchema ? [accessControlMiddleware(options.accessControlSchema)] : []),
  ]);
};
