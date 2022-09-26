import { User } from "@modules/user/domain/entities/user.entity";
import { getUserUseCase } from "@modules/user/use-cases/get-user.usecase";
import { AcessControlActionsEnum } from "@shared/domain/enums/actions.enum";
import { ResourcesEnum } from "@shared/domain/enums/resources.enum";
import { formatJSONResponse } from "@shared/libraries/api-gateway";
import { middyfy } from "@shared/libraries/middyfy";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { plainToInstance } from "class-transformer";

const getUser = async ({
  requestContext: {
    authorizer: { principalId },
  },
}: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const user = await getUserUseCase.execute(principalId);
  const response = plainToInstance(User, user);
  return formatJSONResponse(response);
};

export const main = middyfy(getUser, {
  accessControlSchema: {
    resource: ResourcesEnum.PROFILE,
    action: AcessControlActionsEnum.READ_OWN,
  },
});
