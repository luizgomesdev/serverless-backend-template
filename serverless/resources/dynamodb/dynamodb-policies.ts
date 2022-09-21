import { IIAMRoleResource } from "../../@types/iam-role-config";

export const dynamoDbRole: IIAMRoleResource = {
  Type: "AWS::IAM::Role",
  Properties: {
    PolicyName: "{self:service}-${self:provider.stage}-dynamodb-role",
    PolicyDocument: {
      Version: "2012-10-17",
      Statement: [
        {
          Effect: "Allow",
          Action: [
            "dynamodb:BatchGetItem",
            "dynamodb:BatchWriteItem",
            "dynamodb:CreateTable",
            "dynamodb:DeleteItem",
            "dynamodb:DeleteTable",
            "dynamodb:DescribeTable",
            "dynamodb:GetItem",
            "dynamodb:ListTables",
            "dynamodb:PutItem",
            "dynamodb:Query",
            "dynamodb:Scan",
            "dynamodb:UpdateItem",
            "dynamodb:UpdateTable",
          ],
          Resource: ["arn:aws:dynamodb:${self:provider.region}:*:table/${self:custom.tableNames.users}"],
        },
      ],
    },
  },
};
