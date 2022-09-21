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

export const main = middyfy(getUser);
