import { ILocalDynamoDBConfig } from "../@types/dynamodb-local-config";

export const dynamoDbLocalConfig: ILocalDynamoDBConfig = {
  stages: ["local"],
  start: {
    port: 8000,
    inMemory: true,
    migrate: true,
    seed: true,
  },
};
