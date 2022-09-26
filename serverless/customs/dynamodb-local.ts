import { ILocalDynamoDBConfig } from "../@types/dynamodb-local-config";

export const dynamoDbLocalConfig: ILocalDynamoDBConfig = {
  stages: ["local"],
  start: {
    port: 8000,
    inMemory: true,
    migrate: true,
    seed: true,
  },
  seed: {
    grants: {
      sources: [
        {
          table: "software-service-serverless-local-grants",
          sources: ["serverless/seeds/grants.seed.json"],
        },
      ],
    },
  },
};
