import { CreateUserDTO } from "@modules/user/domain/dtos/createUser.dto";

import { formatJSONResponse } from "@shared/libraries/api-gateway";
import { middyfy } from "@shared/libraries/middyfy";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { createUserUseCase } from "../../use-cases/create-user.usecase";

import { signUpBodySchema } from "./validator";

const singUp = async ({ body }: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.info(`[SignUpHandle] Starting sign up process.`);
  const user = await createUserUseCase.execute(body as unknown as CreateUserDTO);
  console.info(`[SignUpHandle] User created with id: ${user.id}`);
  return formatJSONResponse(user);
};

export const main = middyfy(singUp, signUpBodySchema);
