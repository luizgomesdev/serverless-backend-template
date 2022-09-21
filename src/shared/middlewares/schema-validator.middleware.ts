import { SchemaValidator } from "@shared/domain/schemas/validator.schema";
import { APIGatewayProxyEvent } from "aws-lambda";

export const schemaValidatorMiddleware = (schema?: SchemaValidator) => {
  const before = async (request: any) => {
    try {
      const { body, queryStringParameters } = request.event as APIGatewayProxyEvent;

      if (schema.body) {
        schema.body.validateSync(body);
      }

      if (schema.queryStringParameters) {
        schema.queryStringParameters.validateSync(queryStringParameters ?? {});
      }

      return Promise.resolve();
    } catch (e) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          errors: e.errors,
        }),
      };
    }
  };

  return {
    before,
  };
};
