import { IUser } from "@modules/user/domain/entities/user.entity";
import { dynamodbInstance } from "../../../../../shared/infra/dynamoose/connection.database";
import { userSchema } from "./../schemas/user.schema";

const USER_TABLE_NAME = process.env.USERS_TABLE_NAME || "software-service-serverless-local-users";

export const UserModel = dynamodbInstance.model<IUser>(USER_TABLE_NAME, userSchema);
