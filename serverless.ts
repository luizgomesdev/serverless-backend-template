import type { AWS } from "@serverless/typescript";
import "reflect-metadata";

import { dynamoDbLocalConfig } from "./serverless/customs/dynamodb-local";
import { dynamoDbRole } from "./serverless/resources/dynamodb/dynamodb-policies";

import jwtAuthorizer from "@modules/auth/infra/functions/authorizer";
import signIn from "@modules/auth/infra/functions/sign-in/index";
import getUser from "@modules/user/infra/functions/get-user/index";
import signUp from "@modules/user/infra/functions/sign-up/index";
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
      JWT_SECRET: "secret",
    },
  },
  resources: {
    Resources: {
      UsersTableResource: usersTableResource,
      DynamoDBRole: dynamoDbRole,
    },
  },
  // import the function via paths
  functions: { signUp, signIn, getUser, jwtAuthorizer },
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
    },
    dynamodb: dynamoDbLocalConfig,
  },
};

module.exports = serverlessConfiguration;
