import { CustomAuthorizerCallback, CustomAuthorizerEvent } from "aws-lambda";
import * as createHttpError from "http-errors";
import { verify } from "jsonwebtoken";

const jwtAuthorizer = async (
  { authorizationToken, methodArn }: CustomAuthorizerEvent,
  _,
  callback: CustomAuthorizerCallback
): Promise<void> => {
  if (!authorizationToken) throw new createHttpError.Unauthorized();

  const [scheme, token] = authorizationToken.split(" ");

  if (scheme !== "Bearer") throw new createHttpError.Unauthorized();

  try {
    const decoded = verify(token, process.env.JWT_SECRET) as {
      sub: string;
      role: string;
    };

    callback(null, {
      principalId: decoded.sub as string,
      context: {
        role: decoded.role as string,
      },
      policyDocument: {
        Version: "2012-10-17",
        Statement: [
          {
            Action: "execute-api:Invoke",
            Effect: "Allow",
            Resource: methodArn,
          },
        ],
      },
    });
  } catch (error) {
    console.error(`[Authorizer] Error: ${error.message}`);
    throw new createHttpError.Unauthorized();
  }
};

export const main = jwtAuthorizer;
