import type { AWS } from "@serverless/typescript";
import "reflect-metadata";
import { grantsTableResource } from "./serverless/resources/dynamodb/grants-table";
import { authFunctions } from "./src/modules/auth/index";
import { userFunctions } from "./src/modules/user";

import { dynamoDbLocalConfig } from "./serverless/customs/dynamodb-local";
import { dynamoDbRole } from "./serverless/resources/dynamodb/dynamodb-policies";

import { sharedFunctions } from "@shared/infra";
import { usersTableResource } from "./serverless/resources/dynamodb/users-table";

const serverlessConfiguration: AWS = {
  service: "software-service-serverless",
  frameworkVersion: "3",
  plugins: [
    "serverless-esbuild",
    "serverless-dynamodb-local",
    "serverless-offline", // serverless-offline needs to be last in the list
  ],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    stage: "${opt:stage, 'local'}",
    region: "us-east-1",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
      AWS_ACCESS_KEY_ID: "fake",
      AWS_SECRET_ACCESS_KEY: "fake",
      USERS_TABLE_NAME: "${self:custom.tableNames.users}",
      GRANTS_TABLE_NAME: "${self:custom.tableNames.grants}",
      JWT_SECRET: "secret",
    },
  },
  resources: {
    Resources: {
      UsersTableResource: usersTableResource,
      GrantsTableResource: grantsTableResource,
      DynamoDBRole: dynamoDbRole,
    },
  },
  // import the function via paths
  functions: Object.assign({}, sharedFunctions, userFunctions, authFunctions),
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
    tableNames: {
      users: "${self:service}-${self:provider.stage}-users",
      grants: "${self:service}-${self:provider.stage}-grants",
    },
    dynamodb: dynamoDbLocalConfig,
  },
};

module.exports = serverlessConfiguration;
