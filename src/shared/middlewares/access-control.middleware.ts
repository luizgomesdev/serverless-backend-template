import { AccessControl } from "accesscontrol";

import { AccessControlSchema } from "@shared/domain/schemas/access-control.schema";
import { getAcessControl } from "@shared/libraries/access-control";
import * as createHttpError from "http-errors";

let accessControl: AccessControl;

export const accessControlMiddleware = (data?: AccessControlSchema) => {
  const before = async (request: any) => {
    try {
      if (!accessControl) {
        accessControl = await getAcessControl();
      }

      const userRole = request.event.requestContext.authorizer.role;

      const { role, resource, action } = data;

      console.info(`[AccessControlMiddleware] Checking access for user role: ${userRole ?? role}, resource: ${resource}, action: ${action}`);
      const permission = accessControl.can(userRole ?? role)[action](resource);

      if (!permission.granted) {
        throw new createHttpError.Forbidden();
      }

      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return {
    before,
  };
};
