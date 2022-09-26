import { CreateUserDTO } from "@modules/user/domain/dtos/createUser.dto";
import { User } from "./../../../domain/entities/user.entity";

import { formatJSONResponse } from "@shared/libraries/api-gateway";
import { middyfy } from "@shared/libraries/middyfy";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { plainToInstance } from "class-transformer";
import { createUserUseCase } from "../../../use-cases/create-user.usecase";

import { signUpBodySchema } from "./validator";

const createUser = async ({ body }: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.info(`[SignUpHandle] Starting sign up process.`);
  const user = await createUserUseCase.execute(body as unknown as CreateUserDTO);
  console.info(`[SignUpHandle] User created with id: ${user.id}`);

  const response = plainToInstance(User, user);
  return formatJSONResponse(response);
};

export const main = middyfy(createUser, {
  schemaValidator: signUpBodySchema,
});
