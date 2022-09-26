import { RolesEnum } from "./../../../domain/enums/roles.enum";

import { AcessControlActionsEnum } from "@shared/domain/enums/actions.enum";
import { ResourcesEnum } from "@shared/domain/enums/resources.enum";
import { formatJSONResponse } from "@shared/libraries/api-gateway";
import { middyfy } from "@shared/libraries/middyfy";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

const debug = async (_: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  return formatJSONResponse({});
};

export const main = middyfy(debug, {
  accessControlSchema: {
    role: RolesEnum.USER,
    resource: ResourcesEnum.VIDEO,
    action: AcessControlActionsEnum.CREATE_OWN,
  },
});
