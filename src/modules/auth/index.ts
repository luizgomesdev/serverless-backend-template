import signIn from "./infra/apis/sign-in";
import jwtAuthorizer from "./infra/functions/jwt-authorizer";

export const authFunctions = { jwtAuthorizer, signIn };
