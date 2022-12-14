import { AcessControlActionsEnum } from "@shared/domain/enums/actions.enum";
import { ResourcesEnum } from "@shared/domain/enums/resources.enum";
import { formatJSONResponse } from "@shared/libraries/api-gateway";
import { middyfy } from "@shared/libraries/middyfy";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

const getUser = async ({
  requestContext: {
    authorizer: { principalId },
  },
}: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.info("[GetUser] Event from: ", principalId);
  return formatJSONResponse({});
};

export const main = middyfy(getUser, {
  accessControlSchema: {
    resource: ResourcesEnum.PROFILE,
    action: AcessControlActionsEnum.READ_OWN,
  },
});
