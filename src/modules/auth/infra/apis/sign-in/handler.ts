import { LoginDTO } from "@modules/auth/domain/dtos/login.dto";

import { formatJSONResponse } from "@shared/libraries/api-gateway";
import { middyfy } from "@shared/libraries/middyfy";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { signInUseCase } from "../../../use-cases/sign-in.usecase";

import { signInBodySchema } from "./validator";

const signIn = async ({ body }: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.info(`[SignInHandle] Starting sign up process.`);
  const user = await signInUseCase.execute(body as unknown as LoginDTO);
  return formatJSONResponse(user);
};

export const main = middyfy(signIn, {
  schemaValidator: signInBodySchema,
});
