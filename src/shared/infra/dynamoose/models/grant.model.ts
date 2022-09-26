import { IGrant } from "@shared/domain/entities/grant.entity";
import { dynamodbInstance } from "../connection.database";
import { grantSchema } from "../schemas/grant.schema";

const GRANT_TABLE_NAME = process.env.GRANT_TABLE_NAME || "software-service-serverless-local-grants";

export const GrantModel = dynamodbInstance.model<IGrant>(GRANT_TABLE_NAME, grantSchema);
