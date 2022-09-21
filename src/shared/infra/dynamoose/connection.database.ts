import { DynamoDB } from "@aws-sdk/client-dynamodb";
import * as dynamoose from "dynamoose";

console.info("[Dynamoose] Connecting to DynamoDB.");

process.env.IS_OFFLINE || process.env.NODE_ENV.includes("test")
  ? dynamoose.aws.ddb.local("http://localhost:8000")
  : dynamoose.aws.ddb.set(
      new DynamoDB({
        region: process.env.REGION || "us-east-1",
      })
    );
console.info(
  `[Dynamoose] Connected to DynamoDB on ${process.env.IS_OFFLINE ? "local" : "aws"} at region ${
    process.env.REGION || "us-east-1"
  }.`
);

export const dynamodbInstance = dynamoose;
