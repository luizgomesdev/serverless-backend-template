import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import middyJsonBodyParser from "@middy/http-json-body-parser";
import { SchemaValidator } from "@shared/domain/schemas/schema-validator.schema";
import { schemaValidatorMiddleware } from "@shared/middlewares/schema-validator.middleware";
import { Handler } from "aws-lambda";

export const middyfy = (handler: Handler, schemaValidator?: SchemaValidator) => {
  return middy(handler).use([
    middyJsonBodyParser(),
    httpErrorHandler({}),
    ...(schemaValidator ? [schemaValidatorMiddleware(schemaValidator)] : []),
  ]);
};
